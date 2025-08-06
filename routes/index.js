const router = require('express').Router();
// Import the main Passport instance for authentication
const passport = require('passport');

// The root route redirects to the main resource (bloggers)
router.get('/', function(req, res) {
  res.redirect('/bloggers');
});

// Google OAuth login route
// Initiates authentication with Google using Passport
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
// Handles the callback after Google authentication
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/bloggers', // Redirect here after successful login
    failureRedirect : '/bloggers' // Redirect here if login fails
  }
));

// OAuth logout route
// Logs the user out and redirects to bloggers
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/bloggers');
});

// Export the router for use in the main app
module.exports = router;
