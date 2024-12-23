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
        "Hi, You are welcome to Abiodun Adejare Adekunle's AltSchool second semester exam (project based) Thanks for checking it out!")
});

module.exports = app;
