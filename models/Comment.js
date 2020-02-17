const mongoose = require(`mongoose`);

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

const Comment = mongoose.model(`Comment`, CommentSchema);
module.exports = Comment;