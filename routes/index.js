var router = require('express').Router();
import { authenticate } from 'passport';

// The root route renders our only view
router.get('/', function(req, res) {
  // Where do you want to go for the root route
  // in the student demo this was res.redirect('/students'), what do you want? again no /user, whatever your main resource
  res.redirect('/bloggers');
});

// Google OAuth login route
router.get('/auth/google', authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', authenticate(
  'google',
  {
    successRedirect : '/bloggers', // where do you want the client to go after you login 
    failureRedirect : '/bloggers' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/bloggers');
});

export default router;
