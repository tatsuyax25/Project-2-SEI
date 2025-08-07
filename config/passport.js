// Import the main Passport instance
const passport = require('passport');
// Import the Google OAuth 2.0 strategy
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
// Import the User model (adjust as needed for your project)
const User = require('../models/user');

// ✅ Early environment check
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_SECRET) {
  throw new Error('Missing one or more Google OAuth environment variables');
}

// ✅ Determine environment and set callback URL accordingly
const isProd = process.env.NODE_ENV === 'production';
const callbackURL = isProd
  ? process.env.GOOGLE_CALLBACK // e.g., https://your-app.onrender.com/oauth2callback
  : "https://the-great-journal.onrender.com/oauth2callback"; // e.g., http://localhost:3000/oauth2callback

// ✅ Configure Passport to use the Google OAuth2 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        console.log('🔍 Google Profile:', profile);

        // Check if user already exists
        let userDoc = await User.findOne({ googleId: profile.id });
        if (userDoc) {
          return cb(null, userDoc);
        }

        // Create new user
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails?.[0]?.value || '',
          googleId: profile.id,
        });

        await newUser.save();
        return cb(null, newUser);
      } catch (err) {
        return cb(err);
      }
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
