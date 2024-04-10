var router = require('express').Router()
import { create, update, remove } from '../controllers/comments';

router.post('/bloggers/:id/comments', isLoggedIn, create);
router.put('/comments/:id/', isLoggedIn, update);
router.delete('/comments/:id', isLoggedIn, remove);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/google');
}

export default router;