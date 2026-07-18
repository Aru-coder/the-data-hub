const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${req.method}] ${req.url} - ${time}`);
  next();
});

const PORT = process.env.PORT || 5000;

let blogPosts = [];

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to The Data Hub",
  });
});

app.get("/posts", (req, res) => {
  res.json(blogPosts);
});

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

app.post("/posts", (req, res) => {
  const { id, title, content } = req.body;

  if (id === undefined || !title || !content) {
    return res.status(400).json({
      message: "id, title and content are required",
    });
  }

  const exists = blogPosts.some((item) => item.id === id);

  if (exists) {
    return res.status(409).json({
      message: "Post with this ID already exists",
    });
  }

  const newPost = {
    id,
    title,
    content,
  };

  blogPosts.push(newPost);

  res.status(201).json({
    message: "Blog post created successfully",
    data: newPost,
  });
});

app.put("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = blogPosts.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "title and content are required",
    });
  }

  blogPosts[index] = {
    ...blogPosts[index],
    title,
    content,
  };

  res.json({
    message: "Post updated successfully",
    data: blogPosts[index],
  });
});

app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = blogPosts.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  blogPosts.splice(index, 1);

  res.json({
    message: "Post deleted successfully",
  });
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