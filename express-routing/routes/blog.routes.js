const express = require("express");
const {
  createBlog,
  viewAllBlogs,
  viewBlogById,
  updateBlog,
  deleteBlogById,
} = require("../controller/blog.controller");
const { createBlogDB, updateBlogDB, deleteBlogDB } = require("../controller/blogdb.controller");
const blogRouter = express.Router();

// blogRouter.post("/blog", createBlog);
blogRouter.post("/blog",createBlogDB);
blogRouter.get("/", viewAllBlogs);
blogRouter.get("/blog/:blogId", viewBlogById);
// blogRouter.patch("/blog/:blogId", updateBlog);
blogRouter.patch("/blog/:blogId", updateBlogDB);
// blogRouter.delete("/blog/:blogId", deleteBlogById);
blogRouter.delete("/blog/:blogId", deleteBlogDB);

module.exports = blogRouter;
