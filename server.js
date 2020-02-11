require(`dotenv`).config();
const express = require(`express`);
const exphbs = require(`express-handlebars`);
const logger = require(`morgan`);
const mongoose = require(`mongoose`);


const db = require(`./models`);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(`public`));

// Routes
const articleRouter = require(`./routes/article`);
const userRouter = require(`./routes/user`);
const indexRouter = require(`./routes/index`);
app.use(`/`, indexRouter);
app.use(`/users`, userRouter);
app.use(`/articles`, articleRouter);

// Handlebars
app.engine(
    `handlebars`,
    exphbs({
        defaultLayout: `main`
    })
);
app.set(`view engine`, `handlebars`);

await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/`);
});

module.exports = app;
