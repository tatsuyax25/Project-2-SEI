const Blogger = require('../models/user');
const Journal = require('../models/journal');

module.exports = {
    new: newBlogger,
    create,
    index,
    delete: deleteBlogger,
    show,
    edit

};

function edit(req, res) {
    Journal.findById(req.params.id, function(err, journal){
        if (!journal.user.equals(req.user._id)) return res.redirect('/journals');
        res.render('journals/edit', {journal});
    })
}

async function show(req, res){
    console.log(req.params)
    console.log(req.user)
    const username = req.user?._id 
    const journal = await Journal.findById(req.params.id)
    const thisIsWhatWeAreSendingToTheView = { journal, username }
    console.log(username, journal.user, username === journal.user)
    if (username?.toString() === journal.user.toString()) {
        
        res.render('bloggers/edit', thisIsWhatWeAreSendingToTheView)
    } else {
        res.render('bloggers/show', thisIsWhatWeAreSendingToTheView);
    }
    console.log(journal)
     
    
}

function deleteBlogger(req, res) {
    console.log(req.body, "This is what the form sends me")
    // Note the cool "dot" syntax to query on the property of a subdoc
    Journal.findOne({'journal._id': req.params.id}, function(err, journal) {
        console.log('deleting a blog')
        const journalDoc = journal.id(req.params.id)
        console.log(journalDoc, "this is my journal")
        // journalDoc.remove();
        res.redirect('/bloggers');
    });    
}

function newBlogger(req, res) {
    res.render("bloggers/new", { title: "New Blogger" });
}

function create(req, res) {
    console.log(req.user, "This is my user!")
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

