import Experience from "../models/experienceModel.js";

export const getAllExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ startDate: -1 });
        res.status(200).json({ experiences });
    } catch (error) {
        res.status(500).json({ message: "Error fetching experiences", error });
    }
};

export const createExperience = async (req, res) => {
    const { startDate, endDate } = req.body;
    if (endDate && endDate < startDate) {
        return res.status(400).json({ message: "Invalid date range" });
    }
    if (startDate > Date.now() || endDate > Date.now()) {
        return res.status(400).json({ message: "Start date or end date cannot be in the future" });
    }
    const newExperience = new Experience(req.body);
    try {
        await newExperience.save();
        res.status(201).json({ message: "Experience created successfully", experience: newExperience });
    } catch (error) {
        res.status(500).json({ message: "Error creating experience", error });
    }
};


export const addResponsibilities = async (req, res) => {
    const { experienceId, responsibilities } = req.body;
    try {
        const experience = await Experience.findById(experienceId);
        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }
        if (!Array.isArray(responsibilities)) {
            responsibilities = [responsibilities];
        }
        experience.responsibilities.push(...responsibilities);
        await experience.save();
        res.status(200).json({ message: "Responsibilities added successfully", experience });
    } catch (error) {
        res.status(500).json({ message: "Error adding responsibilities", error });
    }
}

export const addAchievements = async (req, res) => {
    const { experienceId, achievements } = req.body;
    try {
        const experience = await Experience.findById(experienceId);
        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }
        if (!Array.isArray(achievements)) {
            achievements = [achievements];
        }
        experience.achievements.push(...achievements);
        await experience.save();
        res.status(200).json({ message: "Achievements added successfully", experience });
    } catch (error) {
        res.status(500).json({ message: "Error adding achievements", error });
    }
}