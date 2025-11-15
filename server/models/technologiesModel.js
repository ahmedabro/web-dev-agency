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
    items: [
    {
        name: { type: String },
        icon: { type: String }
    }
]
})

const Technology = mongoose.model("Technology", technologySchema);

export default Technology;