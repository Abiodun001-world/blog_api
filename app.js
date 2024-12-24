const express = require("express");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.end(
        "Hi, You are welcome to Abiodun Adejare Adekunle's AltSchool second semester exam (project based) Thanks for checking it out!" +
        "\n\nCheck out the Postman documentation: Postman Documentation: https://documenter.getpostman.com/view/28730642/2sAYJ4hzpz" +
        "\n\nCheck out the GitHub repository of this project:https://github.com/Abiodun001-world/blog_api"
    );
});

module.exports = app;
