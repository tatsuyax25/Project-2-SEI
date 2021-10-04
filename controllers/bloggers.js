const Blogger = require('../models/user');
const Journal = require('../models/journal');

module.exports = {
    index,
    
};




function index(req, res, next) {
    console.log(req.query)
    console.log(req.user)

    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};

    let sortKey = req.query.sort || 'name';
    Blogger.find(modelQuery)
    .sort(sortKey).exec(function(err, bloggers) {
        if (err) return next(err);

        res.render('bloggers/index', {
            users: bloggers,
            bloggers,
            user: req.user,
            name: req.query.name,
            sortKey
        });
    });
}