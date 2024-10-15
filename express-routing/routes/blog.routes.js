const express = require("express");
const {
  createBlog,
  viewAllBlogs,
  viewBlogById,
  updateBlog,
  deleteBlogById,
} = require("../controller/blog.controller");
const blogRouter = express.Router();

blogRouter.post("/blog", createBlog);
blogRouter.get("/", viewAllBlogs);
blogRouter.get("/blog/:blogId", viewBlogById);
blogRouter.patch("/blog/:blogId", updateBlog);
blogRouter.delete("/blog/:blogId", deleteBlogById);

module.exports = blogRouter;
