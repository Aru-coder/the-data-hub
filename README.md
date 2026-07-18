# The Data Hub

The Data Hub is a RESTful API built using Node.js and Express.js as part of Sprint 09 (Track B).

The project demonstrates the basics of backend development by creating APIs for managing blog posts using an in-memory array instead of a database.

## Features

- Create a new blog post
- View all blog posts
- View a single blog post using ID
- Update an existing blog post
- Delete a blog post
- Mock Login API
- Custom request logger middleware
- Input validation
- Error handling

## Technologies Used

- Node.js
- Express.js
- Postman
- Nodemon
- Git & GitHub

## Project Structure

the-data-hub
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
└── Prompts.md

## Testing

All endpoints were tested using Postman.

The following operations were verified:

- Create Post
- Get All Posts
- Get Post by ID
- Update Post
- Delete Post
- Login API
- Validation for missing fields
- Duplicate ID check
- Invalid route handling

## Future Improvements

- MongoDB integration
- JWT authentication
- User registration
- Persistent database
- Better folder structure