import { findById, updateOne, findOne } from '../models/journal';

export default {
    create,
    update,
    remove: deleteComment

}

function create(req, res) {
    findById(req.params.id, function(err, journal){
        if(err) {
            console.log(err)
            return res.send(err)
        }
        console.log(req.user, "<---Req User")
        req.body.userId = req.user._id;
        req.body.userName = req.user.name;

        journal.comment.push(req.body);
        journal.save(function(err) {
            res.redirect('/journals/${journal._id}');
        });
    });
}


function update(req, res) {
    updateOne({'comment._id': req.params.id}, function(err, journal) {
        const commentSubdoc = journal.comments.id(req.params.id);
        if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect('/journals/${journal._id');
        commentSubdoc.text = req.body.text;
        journal.save(function(err) {
            res.redirect('/journals/${journal._id');
        });
    });
}

function deleteComment(req, res) {
    findOne({'comments._id': req.params.id}, function(err, journal) {
        const commentSubdoc = journal.comment.id(req.params.id);
        if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect('/journals/${journal._id}');
        commentSubdoc.remove();
        journal.save(function(err) {
            res.redirect('/journals/${journal._id}');
        });
    });
}


