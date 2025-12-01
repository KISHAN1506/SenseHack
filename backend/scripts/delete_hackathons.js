const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars from backend root
dotenv.config({ path: path.join(__dirname, '../.env') });

const Hackathon = require('../models/Hackathon');

const deleteData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sensehack');
        console.log('MongoDB Connected');

        const result = await Hackathon.deleteMany({});
        console.log(`Deleted ${result.deletedCount} hackathons.`);

        process.exit(0);
    } catch (err) {
        console.error('Error deleting data:', err);
        process.exit(1);
    }
};

deleteData();
