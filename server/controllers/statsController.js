import Stats from "../models/statsModel.js"

export const addStat = async (req, res) => {
    const { label, valueNumber, icon } = req.body;

    if(!label || valueNumber === undefined) {
        return res.status(400).json({ message: 'Label and valueNumber are required fields.' });
    }

    try {
        const newStat = new Stats({ label, valueNumber, icon });
        await newStat.save();
        res.status(201).json({ message: 'Stat added successfully.', stat: newStat });
    } catch (error) {
        console.error('Error adding stat:', error);
        res.status(500).json({ message: 'Failed to add stat.' });
    }

}

export const getStats = async (req, res) => {
    try {
        const stats = await Stats.find();
        res.status(200).json({ stats });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Failed to fetch stats.' });
    }
};


export const updateStat = async (req, res) => {
    const { id } = req.params;
    const { label, valueNumber, icon } = req.body;

    if (!label || valueNumber === undefined) {
        return res.status(400).json({ message: 'Label and valueNumber are required fields.' });
    }

    try {
        const updatedStat = await Stats.findByIdAndUpdate(id, { label, valueNumber, icon }, { new: true });
        if (!updatedStat) {
            return res.status(404).json({ message: 'Stat not found.' });
        }
        res.status(200).json({ message: 'Stat updated successfully.', stat: updatedStat });
    } catch (error) {
        console.error('Error updating stat:', error);
        res.status(500).json({ message: 'Failed to update stat.' });
    }
};
export const deleteStat = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStat = await Stats.findByIdAndDelete(id);
        if (!deletedStat) {
            return res.status(404).json({ message: 'Stat not found.' });
        }
        res.status(200).json({ message: 'Stat deleted successfully.', stat: deletedStat });
    } catch (error) {
        console.error('Error deleting stat:', error);
        res.status(500).json({ message: 'Failed to delete stat.' });
    }
};

