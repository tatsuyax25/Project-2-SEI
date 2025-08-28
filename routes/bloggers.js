let router = require('express').Router();
// Import the bloggers controller (CommonJS style)
let bloggersCtrl = require('../controllers/bloggers');

// GET /students
router.get('/bloggers', bloggersCtrl.index);
router.get('/bloggers/bloggers', bloggersCtrl.index );
router.get('/bloggers/:id', bloggersCtrl.show);
router.get('/bloggers/:id/edit', isLoggedIn, isOwner, bloggersCtrl.edit);
router.post('/bloggers', isLoggedIn, bloggersCtrl.create);
router.put('/bloggers/:id', isLoggedIn, isOwner, bloggersCtrl.update);
router.delete('/bloggers/:id', isLoggedIn, isOwner, bloggersCtrl.delete);

// Authorizing the user to use a route
function isLoggedIn(req, res, next) {
	if ( req.isAuthenticated() ) return next();
	res.redirect('/auth/google');
}

// Ensure user owns the journal they're trying to access
async function isOwner(req, res, next) {
	try {
		const Journal = require('../models/journal');
		const journal = await Journal.findById(req.params.id);
		if (!journal) {
			return res.status(404).send('Journal not found');
		}
		if (journal.user.toString() !== req.user._id.toString()) {
			return res.status(403).send('Access denied');
		}
		next();
	} catch (err) {
		res.status(500).send('Server error');
	}
}



module.exports = router;