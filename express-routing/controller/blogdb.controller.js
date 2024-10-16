const BlogModel=require('../model/blog.model');

const createBlogDB =async(req, res) => {
    try {
      const { title, content } = req.body;
  
      if (!title || !content) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newBlog=new BlogModel({
        title,
        content
      })
      await newBlog.save();
      return res
        .status(200)
        .json({ message: "Blog posted successfully", blogPost: newBlog });
    } catch (error) {
      console.log("Blog creation error", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  const updateBlogDB=async(req,res)=>{
       try{

        const {blogId}=req.params;
        const {newTitle,newContent}=req.body;

        if(!newTitle&&!newContent){
            return res.status(400).json({message:"Please add updations"})
        }

       const updatedBlog=await BlogModel.findByIdAndUpdate(blogId,{title:newTitle, content:newContent},{new:true})

       if(!updatedBlog){
        return res.status(404).json({message:"Blog not found"})
       }

       return res.status(200).json({message:"Blog updated successfully",updatedDetails:updatedBlog})

       }catch(error){
        console.log("Blog updation error",error)
        return res.status(500).json({message:"Server error"})
       }
  }

  const deleteBlogDB=async(req,res)=>{
    try{
        const {blogId}=req.params;

        const blogFound=await BlogModel.findByIdAndDelete(blogId)

        if(!blogFound){
            return  res.status(404).json({message:"Blog not found"})
        }
        return res.status(200).json({message:"Blog deleted successfully",deletedBlogDetails:blogFound})


    }catch(error){
        console.log("Blog deletion error",error)
        return res.status(500).json({message:"Server error"})
    }
  }

  module.exports={createBlogDB,updateBlogDB,deleteBlogDB}