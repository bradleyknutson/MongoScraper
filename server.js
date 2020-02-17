require(`dotenv`).config();
const express = require(`express`);
const exphbs = require(`express-handlebars`);
const logger = require(`morgan`);
const mongoose = require(`mongoose`);
const passport = require(`passport`);
const flash = require(`connect-flash`);


// const db = require(`./models`);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(`public`));
app.use(logger(`dev`));
app.use(require(`express-session`)({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
const articleRouter = require(`./routes/article`);
const indexRouter = require(`./routes/index`);
const authRouter = require(`./routes/auth`);
app.use(`/`, indexRouter);
app.use(`/articles`, articleRouter);
app.use(`/auth`, authRouter);

// Handlebars
app.engine(`handlebars`, exphbs({defaultLayout: `main`}));
app.set(`view engine`, `handlebars`);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}/`);
    });
}).catch(err => {
    if(err) throw err;
});

module.exports = app;