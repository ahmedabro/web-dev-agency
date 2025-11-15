import Project from "../models/projectsModel.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error });
  }
};

export const addProject = async (req, res) => {
  const { title, category, image, description, tags, timeStarted, timeEnded, status } = req.body;

  if (!title || !category || !description) {
      return res.status(400).json({ message: "Title, category and description are required." });
    }

  try {
    const newProject = new Project({
      title,
      category,
      image,
      description,
      tags,
      timeStarted,
      timeEnded,
      status,
    });
    await newProject.save();
    res.status(201).json({ message: "Project added successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Error adding project", error });
  }
};