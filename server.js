const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy data for the API
let meetups = []; // This is a placeholder for meetup data

// API Routes

// Get all meetups
app.get('/api/meetups', (req, res) => {
    res.json(meetups);
});

// Get a meetup by ID
app.get('/api/meetups/:id', (req, res) => {
    const id = req.params.id;
    const meetup = meetups.find(m => m.id === id);
    if (meetup) {
        res.json(meetup);
    } else {
        res.status(404).send('Meetup not found');
    }
});

// Create a new meetup
app.post('/api/meetups', (req, res) => {
    const newMeetup = { id: new Date().toISOString(), ...req.body };
    meetups.push(newMeetup);
    res.status(201).json(newMeetup);
});

// Update a meetup by ID
app.put('/api/meetups/:id', (req, res) => {
    const id = req.params.id;
    const index = meetups.findIndex(m => m.id === id);
    if (index !== -1) {
        meetups[index] = { id, ...req.body };
        res.json(meetups[index]);
    } else {
        res.status(404).send('Meetup not found');
    }
});

// Delete a meetup by ID
app.delete('/api/meetups/:id', (req, res) => {
    const id = req.params.id;
    meetups = meetups.filter(m => m.id !== id);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
