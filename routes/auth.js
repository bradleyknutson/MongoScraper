const authRouter = require(`express`).Router();
const passport = require(`../middleware/passport`);
const db = require(`../models`);

authRouter.post(`/login`, passport.authenticate(`local`, {
    failureRedirect: `/auth/login`,
    failureFlash: `true`
}), (req, res, next) => {
    res.json(`/`);
});

authRouter.get(`/login`, (req, res, next) => {
    if(req.user){
        res.redirect(`/`);
    }
    res.render(`login`, {error: req.flash(`error`)});
});

authRouter.post(`/signup`, (req, res, next) => {
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

authRouter.get(`/signup`, (req, res, next) => {
    if(req.user) {
        res.redirect(`/`);
    }
    res.render(`signup`, {error: req.flash(`error`)});
});

authRouter.get(`/logout`, (req, res) => {
    req.logout();
    res.redirect(`/`);
})

module.exports = authRouter;