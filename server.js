const express = require("express");
const app = express();

// Middleware to read JSON data
app.use(express.json());

// Custom Logger Middleware
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString();

  console.log(`[${req.method}] ${req.url} - ${time}`);

  next();
});

const PORT = 5000;

// In-memory database
let blogPosts = [];

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to The Data Hub",
  });
});

// GET All Posts
app.get("/posts", (req, res) => {
  res.json(blogPosts);
});

// GET Single Post
app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = blogPosts.find((item) => item.id === id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.json(post);
});

// CREATE Post
app.post("/posts", (req, res) => {
  const newPost = req.body;

  // Check if ID already exists
  const exists = blogPosts.some((item) => item.id === newPost.id);

  if (exists) {
    return res.status(400).json({
      message: "Post with this ID already exists",
    });
  }

  blogPosts.push(newPost);

  res.status(201).json({
    message: "Blog post created successfully",
    data: newPost,
  });
});

// UPDATE Post
app.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = blogPosts.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  // Update only the fields provided
  blogPosts[index] = {
    ...blogPosts[index],
    ...req.body,
  };

  res.json({
    message: "Post updated successfully",
    data: blogPosts[index],
  });
});

// DELETE Post
app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const postExists = blogPosts.some((item) => item.id === id);

  if (!postExists) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  blogPosts = blogPosts.filter((item) => item.id !== id);

  res.json({
    message: "Post deleted successfully",
  });
});

// Mock Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  res.json({
    message: "Login successful",
    token: "mock-jwt-token-123456789",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});