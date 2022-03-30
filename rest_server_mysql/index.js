const express = require("express");
const app = express();
const port = 3000;
const topics = require("./routes/topics");
const users = require("./routes/users");
const questions = require("./routes/questions");
const answers = require("./routes/answers");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({message: "ok"});
});

app.use("/api/topics", topics);
app.use("/api/users", users);
app.use("/api/questions", questions);
app.use("/api/answers", answers);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});