var router = require('express').Router();
var bloggersCtrl = require('../controllers/bloggers');

// GET /students
router.get('/bloggers', bloggersCtrl.index);
router.get('/bloggers/bloggers', bloggersCtrl.index );
router.get('/bloggers/:id', bloggersCtrl.show);
router.get('/bloggers/:id/edit', bloggersCtrl.edit);
router.post('/bloggers', bloggersCtrl.create);
router.put('/bloggers/:id', bloggersCtrl.update);
router.delete('/bloggers/:id', bloggersCtrl.delete);

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