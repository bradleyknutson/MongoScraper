const express = require(`express`);
const axios = require(`axios`);
const db = require(`../models`);
const cheerio = require(`cheerio`);
const router = express.Router();

router.get(`/pull`, (req, res) => {
    axios.get(`https://www.nytimes.com/`)
        .then(response => {
            let $ = cheerio.load(response.data);
            $(`div.assetWrapper`).each(function(i, element){
                let article = {};
                article.link = $(element).find(`a`).attr(`href`);
                article.headline = $(element).find(`h2`).text();
                article.overview = $(element).find(`p`).text();
                if(article.link && article.headline && article.overview){
                    axios.get(`https://www.nytimes.com${article.link}`)
                    .then(response => {
                        let $ = cheerio.load(response.data);
                        let fullArticle = [];
                        $(`p`).each(function(i, element){
                            if($(element).text() !== `Advertisement` && $(element).text() !== `Supported by`){
                                fullArticle.push($(element).text());
                            }
                        });
                        article.fullArticle = fullArticle.join(` `);
                        db.Article.create(article)
                            .catch(err => {
                                // console.log(err);
                            });
                    }).catch(err => {
                        console.log(err);
                    });
                }
            });
        })
        .finally(() => {
            res.status(200).end();
        })
        .catch(err => {
            console.log(err);
        });
});

router.get(`/:id`, (req, res) => {
    db.Article.findById(req.params.id)
        .lean()
        .then(article => {
            res.render(`article`, 
            {
                article: article
            })
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;