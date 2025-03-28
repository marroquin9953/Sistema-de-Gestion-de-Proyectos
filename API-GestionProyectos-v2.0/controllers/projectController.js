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

    res.status(201).json({ message: 'Proyecto creado exitosamente', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo crear el proyecto' });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await getAllProjectsFromDB();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudieron conseguir proyectos' });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getProjectByIdFromDB(id);

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo obtener el proyecto' });
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

    res.json({ message: 'Proyecto actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo actualizar el proyecto' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProjectFromDB(id);
    res.json({ message: 'Proyecto eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo eliminar el proyecto' });
  }
};
