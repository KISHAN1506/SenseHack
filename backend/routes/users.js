const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Hackathon = require('../models/Hackathon');
const Team = require('../models/Team');

// Get User Dashboard
router.get('/:id/dashboard', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id) return res.status(403).json({ msg: 'Access denied' });

        const user = await User.findById(req.params.id).select('-password');

        // Find hackathons user is participating in (via teams)
        const teams = await Team.find({ members: req.user.id }).populate('hackathon', 'name startDate endDate');

        // Find hackathons user is organizing
        const organizedHackathons = await Hackathon.find({ organizer: req.user.id });

        res.json({
            user,
            participatingTeams: teams,
            organizedHackathons
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
