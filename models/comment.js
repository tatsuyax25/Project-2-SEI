// Import mongoose and get Schema constructor
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a comment
const commentSchema = new Schema({
    text: String, // The comment text
    user: { type: Schema.Types.ObjectId, ref: "User" } // Reference to the user who made the comment
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Export the comment schema for embedding in other models (like Journal)
module.exports = commentSchema;