const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    age: { type: Number, required: true, min: 0 },
    gender: String,
    disease: { type: String, required: true },
    doctorAssigned: { type: String, required: true },
    admissionDate: { type: Date, default: Date.now },
    roomNumber: String,
    patientType: String,
    status: { type: String, default: 'Admitted' } // Default value 
});

module.exports = mongoose.model('Patient', patientSchema);
// kuch bhi laude 