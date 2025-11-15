import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  description: { type: String, required: true },
  tags: [{ type: String }],
  timeStarted: { type: Date, default: Date.now },
  timeEnded: { type: Date, default: Date.now },
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" },
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;