const express = require("express");
const { createBlog } = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");
const { getBlogs, getBlogById, updateBlog, deleteBlog } = require("../controllers/blogController");

const router = express.Router();
router.post("/", authMiddleware, createBlog);
router.get("/", authMiddleware, getBlogs);
router.get("/:id", authMiddleware, getBlogById);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
