import Service from "../models/serviceModel.js";

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ message: "Error fetching services", error });
    }
};

export const addService = async (req, res) => {
    const { id, title, description } = req.body;

    if (!id || !title || !description) {
        return res.status(400).json({ message: "ID, title, and description are required." });
    }

    try {
        const serviceExists = await Service.findOne({ id });
        if (serviceExists) {
            return res.status(400).json({ message: "Service with this ID already exists." });
        }

        // THIS is the correct way — keep arrays, image, everything!
        const newService = new Service(req.body);

        await newService.save();

        res.status(201).json({ 
            message: "Service added successfully.", 
            service: newService 
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding service", error });
    }
};

export const getServiceById = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await Service.findOne({ id });
        if (!service) {
            return res.status(404).json({ message: "Service not found." });
        }
        res.status(200).json({service});
    } catch (error) {
        res.status(500).json({ message: "Error fetching service", error });
    }
};
