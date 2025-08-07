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
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/bloggers");
  });
});

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not logged in" });
  }
});


// Export the router for use in the main app
module.exports = router;
