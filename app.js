const express = require("express");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

app.get("/", (req, res) => {
    res.end(
        "Hi, You are welcome to Abiodun Adejare Adekunle's AltSchool second semester exam (project based) Thanks for checking it out!" +
        "\n\nCheck out the Postman documentation: <a href='https://www.postman.com/collections/your-postman-collection-link'>Postman Documentation: coming soon!</a>" +
        "\n\nCheck out the GitHub repository: <a href='https://github.com/Abiodun001-world/blog_api'>GitHub Repository</a>"
    );
});

module.exports = app;
