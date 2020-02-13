const express = require(`express`);
const axios = require(`axios`);
const db = require(`../models`);
const router = express.Router();


router.get(`/`, (req, res) => {
    axios.get(`http://localhost:${process.env.PORT || 3000}/articles/pull`)
        .then(response => {
            db.Article.find({})
                .sort({
                    dateAdded: -1
                })
                .lean()
                .then((articles) => {
                    res.render(`index`, {
                        article: articles
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }).catch(err => {
            console.log(err);
        });
});

module.exports = router;