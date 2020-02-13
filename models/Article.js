const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    link: {
        type: String,
        trim: true,
        unique: true
    },

    headline: {
        type: String,
        trim: true
    },

    overview: {
        type: String,
        trim: true
    },

    fullArticle: {
        type: String,
        trim: true
    },

    dateAdded: {
        type: Date,
        default: Date.now
    },

    lastUpdated: {
        type: Date
    },

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

ArticleSchema.methods.lastUpdatedDate = function() {
    this.lastUpdated = Date.now();
    return this.lastUpdated;
  }

const Article = mongoose.model(`Article`, ArticleSchema);
module.exports = Article;