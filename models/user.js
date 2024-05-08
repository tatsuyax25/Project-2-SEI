const mongoose = require("mongoose");

// Define the comment schema
const commentSchema = new mongoose.Schema(
    {
        text: String, // Define a field for the text of comment
    },
    {
        timestamps: true, // Add timestamps for when the comment is created and updated
    }
);

// Define the journal schema
const journalSchema = new mongoose.Schema(
    {
        name: String, // Define a field for the name of the journal
        picture: String, // Define a field for the picture of the journal
        text: String, // Define a field for the text of the journal
        comments: [commentSchema], // Embed the comment schema within the journal schema for handling comments on journals
    },
    {
        timestamps: true, // Add timestamps for when the journal is created and updated
    }
);

// Define the user schema
const userSchema = new mongoose.Schema(
    {
        name: String, // Define a field for the name of the user
        email: String, // Define a field for the email of the user
        journals: [journalSchema], // Embed the journal schema within the user schema for handling journals
        comments: [commentSchema], // Embed the comment schema within the user schema for handling comments
        googleId: String, // Define a field for the googleId of the user
    },
    {
        timestamps: true, // Add timestamps for when the user is created and updated
    }
);

// Create and export the User model based on the user schema
module.exports = mongoose.model("User", userSchema);
