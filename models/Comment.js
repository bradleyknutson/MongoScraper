const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    commentText: {
        type: String,
        required: "Comment is required",
        trim: true,
        minlength: 5
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    article: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }

});

const Comment = mongoose.model(`Comment`, NoteSchema);
module.exports = Comment;