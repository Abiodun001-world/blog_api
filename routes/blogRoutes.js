const express = require("express");
const { 
    createBlog, 
    getBlogs, 
    getBlogById, 
    updateBlog, 
    deleteBlog 
} = require("../controllers/blogController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createBlog);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

// Public routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);

module.exports = router;