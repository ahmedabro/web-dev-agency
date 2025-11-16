import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    responsibilities: {
        type: [String],
    },
    achievements: {
        type: [String],
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
    },
    isCurrent: {
        type: Boolean,
        default: function () {
            return !this.endDate;
        }
    }
})

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;