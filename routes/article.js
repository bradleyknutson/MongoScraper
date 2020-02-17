const articleRouter = require(`express`).Router();
const axios = require(`axios`);
const db = require(`../models`);
const cheerio = require(`cheerio`);
const commentRouter = require(`./note`);

articleRouter.get(`/pull`, (req, res) => {
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

articleRouter.get(`/:articleid`, (req, res) => {
    db.Article.findById(req.params.articleid)
        .lean()
        .populate(`comments`)
        .then(article => {
            res.render(`article`, 
            {
                article: article,
                user: req.user
            })
        })
        .catch(err => {
            console.log(err);
        });
});

articleRouter.use(`/:articleid/comment`, commentRouter);

module.exports = articleRouter;