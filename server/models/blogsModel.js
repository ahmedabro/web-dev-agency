import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    images: {
        type: [String],
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
