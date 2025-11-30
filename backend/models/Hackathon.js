const mongoose = require('mongoose');

const HackathonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    startDate: Date,
    endDate: Date,
    registrationDeadline: Date,
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    phases: [{
        name: String,
        startDate: Date,
        endDate: Date,
        isActive: {
            type: Boolean,
            default: false
        }
    }],
    currentPhase: {
        type: String,
        default: 'Registration'
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Hackathon', HackathonSchema);
