const Blog = require("../models/Blog");
const calculateReadingTime = require("../utils/readingTime"); 

exports.createBlog = async (req, res) => {
  try {
    const readingTime = calculateReadingTime(req.body.body);
    const blog = await Blog.create({
      ...req.body,
      reading_time: readingTime,
      author: req.user._id,
    });
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ message: "Get Blogs Successfully", blogs });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Get Blog By Id successfully", blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(204).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
