import Technology from "../models/technologiesModel.js";

export const getTechnologies = async (req, res) => {
    try {
        const technologies = await Technology.find();
        res.status(200).json({ technologies });
    } catch (error) {
        res.status(500).json({ message: "Error fetching technologies" });
    }
};

export const addTechnology = async (req, res) => {
    const { category, icon, items } = req.body;

    if (!category || !icon) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    try {
        const newTechnology = new Technology({
            category,
            icon,
            items
        });
        await newTechnology.save();
        res.status(201).json({ message: "Technology added successfully", technology: newTechnology });
    } catch (error) {
        res.status(500).json({ message: "Error adding technology" });
    }
};

export const addItem = async (req, res) => {
    const { technologyId, name, icon } = req.body;

    if (!technologyId || !name || !icon) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const technology = await Technology.findById(technologyId);
        if (!technology) {
            return res.status(404).json({ message: "Technology not found" });
        }

        if(technology.items.some(item => item.name.toLowerCase() === name.toLowerCase())) {
            return res.status(400).json({ message: "Item already exists" });
        }

        technology.items.push({ name, icon });
        await technology.save();

        res.status(201).json({ message: "Item added successfully", technology });
    } catch (error) {
        res.status(500).json({ message: "Error adding item" });
    }
};
