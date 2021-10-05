const Blogger = require('../models/user');
const Journal = require('../models/journal');

module.exports = {
    new: newBlogger,
    create,
    index,
    // show,

};

function newBlogger(req, res) {
    res.render("bloggers/new", { title: "New Blogger" });
}

function create(req, res) {
    req.body.user = req.user._id
    let newJournal = new Journal(req.body)
    newJournal.save(function (err) {
        res.redirect("/bloggers")
    })
}


function index(req, res, next) {
    console.log(req.query)
    console.log(req.user)

    let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};

    let sortKey = req.query.sort || 'name';
    Blogger.find(modelQuery)
        .sort(sortKey).exec(function (err, bloggers) {
            Journal.find({}, function (e, journals) {


                if (err) return next(err);

                res.render('bloggers/index', {
                    users: bloggers,
                    bloggers,
                    user: req.user,
                    name: req.query.name,
                    sortKey,
                    journals
                });
            })
        });
}

