// Import mongoose and get Schema and model constructors
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
// Import the comment schema for embedding comments in journals
const commentSchema = require('./comment');

// Define the schema for a journal entry
const journalSchema = new Schema(
    {
        name: String, // Name/title of the journal
        picture: String, // Optional picture URL
        text: String, // Main journal text
        comments: [commentSchema], // Array of embedded comments
        user: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to the user who created the journal
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Export the Journal model for use in the app
module.exports = model('Journal', journalSchema);