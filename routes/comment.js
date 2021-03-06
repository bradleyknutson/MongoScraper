const commentRouter = require(`express`).Router({mergeParams: true});
const db = require(`../models`);

commentRouter.post(`/create`, (req, res, next) => {
    db.Comment.create({...req.body, userId: req.user._id, userEmail: req.user.email, article: req.params.articleid})
        .then(comment => {
            db.User.findByIdAndUpdate(req.user._id, 
                {
                    $push: {
                        comments: comment._id
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            db.Article.findByIdAndUpdate(req.params.articleid, {
                $push: {
                    comments: comment._id
                }
            })
            .catch(err => {
                console.log(err);
            });
        })
        .then(() => {
            res.json(`/articles/${req.params.articleid}`);
        })
        .catch(err => {
            console.log(err);
        });
});

commentRouter.delete(`/:id/delete`, (req, res, next) => {
    db.Comment.findById(req.params.id)
        .then((comment) => {
            comment.deleteOne();
            res.status(200).end();
        }).catch(err => {
            res.send(err);
        });
});

module.exports = commentRouter;