const express = require(`express`);
const router = express.Router();
const passport = require(`../middleware/passport`);
const db = require(`../models`);

router.post(`/login`, passport.authenticate(`local`, {
    failureRedirect: `/auth/login`,
    failureFlash: `true`
}), (req, res, next) => {
    res.json(`/`);
});

router.get(`/login`, (req, res, next) => {
    if(req.user){
        res.redirect(`/`);
    }
    res.render(`login`);
});

router.post(`/signup`, (req, res, next) => {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(() => {
        res.redirect(307, `/auth/login`);
    }).catch(err => {
        console.log(err);
        res.status(422).json(err.errors[0].message);
    });
});

router.get(`/signup`, (req, res, next) => {
    if(req.user) {
        res.redirect(`/`);
    }
    res.render(`signup`);
})

module.exports = router;