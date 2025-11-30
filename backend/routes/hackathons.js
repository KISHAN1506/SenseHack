const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Hackathon = require('../models/Hackathon');
const Team = require('../models/Team');
const Submission = require('../models/Submission');
const User = require('../models/User');

// Create Hackathon (Org only)
router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'organizer') return res.status(403).json({ msg: 'Access denied' });

        const newHackathon = new Hackathon({
            ...req.body,
            organizer: req.user.id
        });
        const hackathon = await newHackathon.save();
        res.json(hackathon);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Get All Hackathons
router.get('/', async (req, res) => {
    try {
        const hackathons = await Hackathon.find().populate('organizer', 'name');
        res.json(hackathons);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Get Hackathon Details
router.get('/:id', async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id).populate('organizer', 'name');
        if (!hackathon) return res.status(404).json({ msg: 'Hackathon not found' });
        res.json(hackathon);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Hackathon not found' });
        res.status(500).send('Server Error');
    }
});

// Create Team
router.post('/:id/teams', auth, async (req, res) => {
    try {
        const hackathon = await Hackathon.findById(req.params.id);
        if (!hackathon) return res.status(404).json({ msg: 'Hackathon not found' });

        const newTeam = new Team({
            name: req.body.name,
            hackathon: req.params.id,
            leader: req.user.id,
            members: [req.user.id]
        });

        const team = await newTeam.save();
        hackathon.teams.push(team.id);
        await hackathon.save();
        res.json(team);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Join Team Request
router.post('/:id/teams/:teamId/join', auth, async (req, res) => {
    try {
        const team = await Team.findById(req.params.teamId);
        if (!team) return res.status(404).json({ msg: 'Team not found' });

        if (team.members.includes(req.user.id)) {
            return res.status(400).json({ msg: 'Already a member' });
        }

        // Check if already requested
        if (team.joinRequests.some(req => req.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Request already sent' });
        }

        team.joinRequests.push({ user: req.user.id, message: req.body.message });
        await team.save();
        res.json(team);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Submit Repo/Slides (Team Leader)
router.post('/:id/submissions', auth, async (req, res) => {
    try {
        // Find team where user is leader for this hackathon
        const team = await Team.findOne({ hackathon: req.params.id, leader: req.user.id });
        if (!team) return res.status(404).json({ msg: 'Team not found or not authorized' });

        const newSubmission = new Submission({
            team: team.id,
            hackathon: req.params.id,
            repoLink: req.body.repoLink,
            slidesLink: req.body.slidesLink,
            demoLink: req.body.demoLink
        });

        const submission = await newSubmission.save();

        // Update team with submission links
        team.projectRepo = req.body.repoLink;
        team.projectSlides = req.body.slidesLink;
        await team.save();

        res.json(submission);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Submissions (Org/Judge)
router.get('/:id/submissions', auth, async (req, res) => {
    try {
        // Check if user is org or judge (simplified check)
        // In real app, check if user is associated with hackathon as judge/org
        const submissions = await Submission.find({ hackathon: req.params.id })
            .populate('team', 'name members')
            .populate('scores.judge', 'name');
        res.json(submissions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update Phase (Org)
router.post('/:id/phase', auth, async (req, res) => {
    try {
        if (req.user.role !== 'organizer') return res.status(403).json({ msg: 'Access denied' });

        const hackathon = await Hackathon.findById(req.params.id);
        if (!hackathon) return res.status(404).json({ msg: 'Hackathon not found' });

        hackathon.currentPhase = req.body.phase;
        await hackathon.save();
        res.json(hackathon);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get Open Teams
router.get('/:id/teams/open', async (req, res) => {
    try {
        const teams = await Team.find({ hackathon: req.params.id, isOpen: true }).populate('leader', 'name');
        res.json(teams);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
