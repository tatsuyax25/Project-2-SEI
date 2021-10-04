const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String
}, {
    timestamps: true // need to have googleId on my userSchema
});

module.exports = mongoose.model('User', userSchema);
