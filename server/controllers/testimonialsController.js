import Testimonial from "../models/testimonialsModel.js";

export const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.status(200).json({ testimonials });
    } catch (error) {
        res.status(500).json({ message: "Error fetching testimonials", error });
    }
};

export const createTestimonial = async (req, res) => {
    const { author, text, designation, company, rating, picture } = req.body;
    const newTestimonial = new Testimonial({ author, text, designation, company, rating, picture });
    try {
        await newTestimonial.save();
        res.status(201).json({ message: "Testimonial created successfully", testimonial: newTestimonial });
    } catch (error) {
        res.status(500).json({ message: "Error creating testimonial", error });
    }
};