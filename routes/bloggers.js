var router = require('express').Router();
var bloggersCtrl = require('../controllers/bloggers');

// GET /students
router.get('/bloggers', bloggersCtrl.index);
router.post('/blogger', bloggersCtrl.create);
router.delete('/blogger', bloggersCtrl.delete);

// Authorizing the user to use a route
// probably only want to use this on
// post, put or delete routes
function isLoggedIn(req, res, next) {
	// req.isAuthenticated() this is given to us by passport
	// it returns true or false
	if ( req.isAuthenticated() ) return next(); // next() go to the next function in middleware, above situation studentsCtrl.addFackt
	res.redirect('/auth/google'); // redirect them to login
}



module.exports = router;