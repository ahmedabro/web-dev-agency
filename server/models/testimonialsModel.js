import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    designation: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: "https://randomuser.me/api/portraits/men/1.jpg"
    }
})

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;

