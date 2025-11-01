const Blog = require("../models/blogsmodels");

// Add blog
exports.addBlog = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = await Blog.create({ title, content, imageUrl, author, tags });
    res.status(201).json({ message: "Blog added successfully", blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;

    await Blog.update(req.params.id, { title, content, imageUrl, author, tags });
    res.json({ message: "Blog updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.delete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
