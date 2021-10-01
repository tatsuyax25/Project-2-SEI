const mongoose = require('mongoose');

// Create your User Model
const factSchema = new mongoose.Schema({
    text: String
}, {
    timestamps: true
});

const outdoorSchema = new mongoose.Schema({
    name: String,
    email: String,
    cohort: String,
    avatar: String,
    facts: [factSchema],
    googleId: String
}, {
    timestamps: true // need to have googleId on my userSchema
});

module.exports = mongoose.model('Outdoor', outdoorSchema);
