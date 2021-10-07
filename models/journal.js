const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = require('./comment')

const journalSchema = new mongoose.Schema({
    name: String,
    picture: String,
    text: String,
    comments: [commentSchema],
    user: {type: Schema.Types.ObjectId, ref: "User"}
}, {
    timestamps: true
});


module.exports = mongoose.model('Journal', journalSchema);