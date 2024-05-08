// Import necessary Passport functions and modules
const { use, serializeUser, deserializeUser } = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Use passport-google-oauth20 for OAuth2.0
const { findOne, findById } = require('../models/user');
const passport = require('passport');
const Blogger = require('../models/user').default;
//Require your User Model here!

// Configure Passport to use the Google OAuth2 strategy
use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Your Google client ID obtained from the Google Developer Console
      clientSecret: process.env.GOOGLE_SECRET, // Your Google client secret obtained from the Google Developer Console
      callbackURL: process.env.GOOGLE_CALLBACK, // The callback URL registered with Google Developer Console
    },
    function (accessToken, refreshToken, profile, cb) {
      // This function is called when a user has successfully authenticated via Google OAuth
      console.log(profile, "<----Profile");

      // Find if the user exists in your database based on the Google ID
      findOne({ googleId: profile.id }, function(err, bloggerDoc) {

        if (err) return cb(err);

        if (bloggerDoc) {
          // If the user already exists, return the user document
          return cb(null, bloggerDoc);
        } else {
          // If the user does not exist, create a new user using the profile information
          const newBlogger = new Blogger({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });

          // Save the new user to the database
          newBlogger.save(function(err) {
            if(err) return cb(err);
            return cb(null, newBlogger);
          });
        }
      });
    }
  )
);

// Serialize the user to store in the session
serializeUser(function(blogger, done) {
  done(null, blogger.id);
});

// Deserialize the user from the session
deserializeUser(function(id, done) {
  // Find the user by ID in the database
  findById(id, function (err, bloggerDoc) {
    // Pass the user document to done callback
    done(err, bloggerDoc);
  });
});

module.exports = passport;
