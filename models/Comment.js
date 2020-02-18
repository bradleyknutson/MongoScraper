const mongoose = require(`mongoose`);
const Article = require(`./Article`);
const User = require(`./User`);

const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    commentText: {
        type: String,
        required: "Comment is required",
        trim: true,
        minlength: 5
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    userEmail: {
        type: String,
        required: true
    },

    article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }

});

CommentSchema.pre(`deleteOne`, {document: true}, function(next){
    Article.findByIdAndUpdate(this.article, {
        $pull: {
            comments: this._id
        }
    }).catch(err => console.log(err));
    User.findByIdAndUpdate(this.userId, {
        $pull: {
            comments: this._id
        }
    }).catch(err => console.log(err));
    next();
});

const Comment = mongoose.model(`Comment`, CommentSchema);
module.exports = Comment;