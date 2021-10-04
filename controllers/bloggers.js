const Blogger = require('../models/user');

module.exports = {
    index,
    addFact
};

// function addFact(req, res){
//     req.user.facts.push(req.body);

//     req.user.save(function(err){
//         res.redirect('/bloggers')
//     })
// }


function index(req, res, next) {
    console.log(req.query)
    console.log(req.user)

    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};

    let sortKey = req.query.sort || 'name';
    Blogger.find(modelQuery)
    .sort(sortKey).exec(function(err, bloggers) {
        if (err) return next(err);

        res.render('bloggers/index', {
            bloggers,
            user: req.user,
            name: req.query.name,
            sortKey
        });
    });
}