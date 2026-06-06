import Blog from "../models/blogsModel.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { category, date, title, content } = req.body;

    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadToCloudinary(file.buffer, "web-dev-agency/blogs")

        return result.secure_url
      })
    )

    const newBlog = new Blog({
      category,
      date,
      images: imageUrls,
      title,
      content
    });

    const savedBlog = await newBlog.save();

    // const response = await fetch('http://localhost:5000/api/send-newsletter', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ savedBlog })
    // });

    // const newsletterResult = await response.json();


    res.status(201).json({
      // message: newsletterResult.success
      //   ? `Blog created and ${newsletterResult.message}`
      //   : `Blog created but failed to send newsletter: ${newsletterResult.error}`,
      message: "Blog Created Successfully",
      blog: savedBlog,
      // newsletter: newsletterResult
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error: error.message, stack: error.stack });
  }
};
