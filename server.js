require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Patient = require('./models/Patient');

const app = express();
app.use(express.json()); // Middleware for JSON 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err));

// --- API ENDPOINTS --- 

// 1. Register a new patient
app.post('/patients', async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json(patient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. Get all patient records
app.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// 3. Search patient by name (Search functionality)
app.get('/patients/search', async (req, res) => {
    try {
        const { name } = req.query;
        const patients = await Patient.find({ fullName: new RegExp(name, 'i') });
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ error: 'Search failed' });
    }
});

// 4. Get patient by ID
app.get('/patients/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ error: 'Not Found' });
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// 5. Update patient details
app.put('/patients/:id', async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPatient);
    } catch (err) {
        res.status(400).json({ error: 'Update failed' });
    }
});

// 6. Delete patient record
app.delete('/patients/:id', async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Patient record deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Delete failed' });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));