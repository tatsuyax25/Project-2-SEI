const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    text: String,
    user: {type: Schema.Types.ObjectId, ref: "User"}
}, {
    timestamps: true
});


module.exports = commentSchema