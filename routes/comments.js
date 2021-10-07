var router = require('express').Router()
var commentsCtrl = require('../controllers/comments');

router.post('/bloggers/:id/comments', isLoggedIn, commentsCtrl.create);
router.put('/comments/:id/', isLoggedIn, commentsCtrl.update);
router.delete('/comments/:id', isLoggedIn, commentsCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

module.exports = router;