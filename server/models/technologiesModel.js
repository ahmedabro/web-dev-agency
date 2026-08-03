import mongoose from "mongoose";

const technologySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    items: [
        {
            name: { type: String },
            icon: { type: String }
        },
    ],
    order: {
        type: Number,
        required: true,
    }
})

const Technology = mongoose.model("Technology", technologySchema);

export default Technology;