import { validationResult } from 'express-validator';
import {
  createProjectInDB,
  getAllProjectsFromDB,
  getProjectByIdFromDB,
  updateProjectInDB,
  deleteProjectFromDB,
} from '../models/projectModel.js';

export const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nombre, descripcion, fecha_inicio, fecha_fin, gerente_id } = req.body;

    const newProject = {
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      gerente_id,
    };

    const project = await createProjectInDB(newProject);

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create project' });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await getAllProjectsFromDB();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get projects' });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getProjectByIdFromDB(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get project' });
  }
};

export const updateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { nombre, descripcion, fecha_inicio, fecha_fin, gerente_id } = req.body;

    const updatedProject = {
      id,
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      gerente_id,
    };

    await updateProjectInDB(updatedProject);

    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update project' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProjectFromDB(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};
