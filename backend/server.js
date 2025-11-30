const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sensehack', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes (Placeholders)
app.get('/', (req, res) => {
    res.send('Sense Hack API is running');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/hackathons', require('./routes/hackathons'));
app.use('/api/users', require('./routes/users'));
app.use('/api/submissions', require('./routes/submissions'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
