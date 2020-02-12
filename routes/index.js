const express = require(`express`);
const axios = require(`axios`);
const db = require(`../models`);
const router = express.Router();


router.get(`/`, (req, res) => {
    axios.get(`/articles/pull`)
        .then(response => {
            res.render(`index`);
        }).catch(err => {
            console.log(err);
        });
});

module.exports = router;