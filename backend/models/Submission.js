const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    hackathon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hackathon',
        required: true
    },
    repoLink: String,
    slidesLink: String,
    demoLink: String,
    scores: [{
        judge: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        criteria: Map, // e.g., { "Innovation": 10, "Technicality": 8 }
        totalScore: Number,
        feedback: String
    }],
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
