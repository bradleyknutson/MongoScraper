require(`dotenv`).config();
const express = require(`express`);
const exphbs = require(`express-handlebars`);
const logger = require(`morgan`);
const mongoose = require(`mongoose`);


// const db = require(`./models`);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(`public`));
app.use(logger(`dev`));
require(`./middleware/passport`);

// Routes
const articleRouter = require(`./routes/article`);
const userRouter = require(`./routes/user`);
const indexRouter = require(`./routes/index`);
const auth = require(`./routes/auth`);
app.use(`/`, indexRouter);
app.use(`/user`, passport.authenticate(`jwt`, {session: false}), userRouter);
app.use(`/articles`, articleRouter);
app.use(`/auth`, auth);

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