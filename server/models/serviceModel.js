import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

// Service Schema
const serviceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  solutions: [itemSchema], 
  benefits: [itemSchema], 
  howItWorks: [itemSchema], 
  techStack: [String] 
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);

export default Service;
