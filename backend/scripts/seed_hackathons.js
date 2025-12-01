const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars from backend root
dotenv.config({ path: path.join(__dirname, '../.env') });

const Hackathon = require('../models/Hackathon');
const User = require('../models/User');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sensehack');
        console.log('MongoDB Connected');

        // Find an organizer
        const organizer = await User.findOne();
        if (!organizer) {
            console.error('No users found. Please create a user first.');
            process.exit(1);
        }
        console.log(`Using organizer: ${organizer.name} (${organizer._id})`);

        const hackathons = [
            {
                name: 'AI Innovation Challenge',
                description: 'Build the next generation of AI applications.',
                startDate: new Date('2025-01-15'),
                endDate: new Date('2025-01-17'),
                registrationDeadline: new Date('2025-01-10'),
                organizer: organizer._id,
                currentPhase: 'Registration',
                phases: [
                    { name: 'Registration', startDate: new Date('2024-12-01'), endDate: new Date('2025-01-10'), isActive: true },
                    { name: 'Hacking', startDate: new Date('2025-01-15'), endDate: new Date('2025-01-17'), isActive: false },
                    { name: 'Judging', startDate: new Date('2025-01-18'), endDate: new Date('2025-01-20'), isActive: false }
                ]
            },
            {
                name: 'Green Tech Hack',
                description: 'Solutions for a sustainable future.',
                startDate: new Date('2025-02-20'),
                endDate: new Date('2025-02-22'),
                registrationDeadline: new Date('2025-02-15'),
                organizer: organizer._id,
                currentPhase: 'Registration',
                phases: [
                    { name: 'Registration', startDate: new Date('2025-01-01'), endDate: new Date('2025-02-15'), isActive: true }
                ]
            },
            {
                name: 'FinTech Revolution',
                description: 'Disrupting the financial industry.',
                startDate: new Date('2024-11-10'),
                endDate: new Date('2024-11-12'),
                registrationDeadline: new Date('2024-11-05'),
                organizer: organizer._id,
                currentPhase: 'Ended',
                phases: [
                    { name: 'Registration', startDate: new Date('2024-10-01'), endDate: new Date('2024-11-05'), isActive: false },
                    { name: 'Hacking', startDate: new Date('2024-11-10'), endDate: new Date('2024-11-12'), isActive: false }
                ]
            },
            {
                name: 'Health & Wellness Hackathon',
                description: 'Improving lives through technology.',
                startDate: new Date('2025-03-10'),
                endDate: new Date('2025-03-12'),
                registrationDeadline: new Date('2025-03-05'),
                organizer: organizer._id,
                currentPhase: 'Registration',
                phases: [
                    { name: 'Registration', startDate: new Date('2025-02-01'), endDate: new Date('2025-03-05'), isActive: true }
                ]
            },
            {
                name: 'EdTech Future',
                description: 'Reimagining education.',
                startDate: new Date('2025-04-05'),
                endDate: new Date('2025-04-07'),
                registrationDeadline: new Date('2025-03-30'),
                organizer: organizer._id,
                currentPhase: 'Registration',
                phases: [
                    { name: 'Registration', startDate: new Date('2025-03-01'), endDate: new Date('2025-03-30'), isActive: true }
                ]
            }
        ];

        const result = await Hackathon.insertMany(hackathons);
        console.log(`Seeded ${result.length} hackathons.`);

        process.exit(0);
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
