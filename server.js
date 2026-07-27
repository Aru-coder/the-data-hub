require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const Post = require("./models/Post");
const User = require("./models/User");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${req.method}] ${req.url} - ${time}`);
  next();
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to The Data Hub",
  });
});

// GET /posts/top: Return the Top 3 Most Recent Posts
app.get("/posts/top", async (req, res) => {
  try {
    const topPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate("authorId");
    res.json(topPosts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /posts: Query all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("authorId");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /posts/:id: Query a specific post
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("authorId");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /posts: Create a new post
app.post("/posts", async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "title and content are required" });
    }
    const newPost = await Post.create({ title, content, authorId });
    res.status(201).json({
      message: "Blog post created successfully",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /posts/:id: Update a post
app.put("/posts/:id", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "title and content are required" });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /posts/:id: Delete a post
app.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /users: Create a user (Helper route for testing relational modeling)
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "name and email are required" });
    }
    const newUser = await User.create({ name, email });
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

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

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});