let blogDB = [];

const createBlog = (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const blogDetails = {
      userId: Math.floor(Math.random() * 10000),
      blogId: blogDB.length + 1,
      title,
      content,
      date: new Date(),
    };
    blogDB.push(blogDetails);
    return res
      .status(200)
      .json({ message: "Blog posted successfully", blogPost: blogDB });
  } catch (error) {
    console.log("Blog creation error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const viewAllBlogs = (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "Blogs returned successfully", blogPost: blogDB });
  } catch (error) {
    console.log("Blogs view error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const viewBlogById = (req, res) => {
  try {
    const { blogId } = req.params;
    console.log(blogId);
    const blog = blogDB.find((b) => b.blogId === parseInt(blogId));
    console.log(blog);
    if (!blog) {
      return res.status(404).json({ message: "Blog Not found" });
    }
    return res
      .status(200)
      .json({ message: "Blog returned successfully", blogPost: blog });
  } catch (error) {
    console.log("Blog view by id error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateBlog = (req, res) => {
  try {
    const { title, content } = req.body;
    const { blogId } = req.params;

    if (!title && !content) {
      return res.status(400).json({ message: "Details not found" });
    }
    const blog = blogDB.find((b) => b.blogId == blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog  not found" });
    }

    if (title) {
      blog.title = title;
    }
    if (content) {
      blog.content = content;
    }
    return res.status(200).json({
      message: "Blog details updated successfully",
      blogDetails: blogDB,
    });
  } catch (error) {
    console.log("Blog update error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteBlogById = (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = blogDB.find((b) => b.blogId == blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blogDB = blogDB.filter((b) => b.blogId != blogId);
    return res
      .status(200)
      .json({ message: "Blog deleted successfully", blogDetails: blogDB });
  } catch (error) {
    console.log("Blog deletion error", error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  createBlog,
  viewAllBlogs,
  viewBlogById,
  updateBlog,
  deleteBlogById,
};

