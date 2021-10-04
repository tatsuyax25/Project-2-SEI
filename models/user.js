const mongoose = require('mongoose');

// Create your User Model
// const factSchema = new mongoose.Schema({
//     text: String
// }, {
//     timestamps: true
// });
const journalSchema = new mongoose.Schema({
    name: String,
    picture: String,
    text: String,
    comments: [commentSchema],
}, {
    timestamps: true
});

const commentSchema = new mongoose.Schema({
    text: String
}, {
    timestamps: true
});



const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    journals: [journalSchema],
    comments: [commentSchema],
    // facts: [factSchema],
    googleId: String
}, {
    timestamps: true // need to have googleId on my userSchema
});

module.exports = mongoose.model('User', userSchema);
