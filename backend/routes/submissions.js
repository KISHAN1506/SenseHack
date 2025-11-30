const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Submission = require('../models/Submission');

// Score Submission (Judge)
router.post('/:id/score', auth, async (req, res) => {
    try {
        // In real app, verify user is a judge
        const submission = await Submission.findById(req.params.id);
        if (!submission) return res.status(404).json({ msg: 'Submission not found' });

        const newScore = {
            judge: req.user.id,
            criteria: req.body.criteria,
            totalScore: req.body.totalScore,
            feedback: req.body.feedback
        };

        submission.scores.push(newScore);
        await submission.save();
        res.json(submission);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
