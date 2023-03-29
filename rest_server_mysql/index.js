const express = require("express");
const app = express();
const port = 8001;
const cors = require('cors');
const topics = require("./routes/topics");
const users = require("./routes/users");
const questions = require("./routes/questions");
const answers = require("./routes/answers");
const responses = require("./routes/reponses");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.status(200).json({message: "ok"});
});

app.use("/api/topics", topics);
app.use("/api/users", users);
app.use("/api/questions", questions);
app.use("/api/answers", answers);
app.use("/api/responses", responses);

app.use(cors({
    // origin:'http://10.27.158.242:3000', 
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }));

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