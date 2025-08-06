// Import the main Passport instance
const passport = require('passport');
// Import the Google OAuth 2.0 strategy
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
// Import the User model (adjust as needed for your project)
const User = require('../models/user');

// Configure Passport to use the Google OAuth2 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Google client ID from environment variables
      clientSecret: process.env.GOOGLE_SECRET, // Google client secret from environment variables
      callbackURL: process.env.GOOGLE_CALLBACK, // Callback URL registered with Google
    },
    // This function runs after Google authenticates the user
    function (accessToken, refreshToken, profile, cb) {
      // Log the Google profile for debugging
      console.log(profile, '<----Profile');

      // Try to find an existing user with the Google ID
      User.findOne({ googleId: profile.id }, function (err, userDoc) {
        if (err) return cb(err);
        if (userDoc) {
          // User exists, return the user
          return cb(null, userDoc);
        } else {
          // User does not exist, create a new user
          const newUser = new User({
            name: profile.displayName,
            // Use optional chaining to safely access the user's email from the Google profile
            email: profile.emails?.[0]?.value || '',
            googleId: profile.id,
          });
          // Save the new user to the database
          newUser.save(function (err) {
            if (err) return cb(err);
            return cb(null, newUser);
          });
        }
      });
    }
  )
);

// Serialize the user to store in the session (user.id is saved in the session cookie)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserialize the user from the session (fetch user from DB by ID)
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, userDoc) {
    done(err, userDoc);
  });
});

// Export the configured passport instance
module.exports = passport;
