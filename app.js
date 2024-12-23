const express = require("express");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

module.exports = app;
