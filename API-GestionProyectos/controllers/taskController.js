import { validationResult } from 'express-validator';
import {
  createTaskInDB,
  getAllTasksByProjectIdFromDB,
  updateTaskInDB,
  deleteTaskFromDB,
  addCommentToTaskInDB,
  getCommentsByTaskIdFromDB,
} from '../models/taskModel.js';

export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params; // Project ID
    const { nombre, descripcion, estado, asignado_a } = req.body;

    const newTask = {
      nombre,
      descripcion,
      estado,
      proyecto_id: id,
      asignado_a,
    };

    const task = await createTaskInDB(newTask);

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

export const getAllTasksByProjectId = async (req, res) => {
  try {
    const { id } = req.params; // Project ID
    const tasks = await getAllTasksByProjectIdFromDB(id);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get tasks' });
  }
};

export const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params; // Task ID
    const { nombre, descripcion, estado, asignado_a } = req.body;

    const updatedTask = {
      id,
      nombre,
      descripcion,
      estado,
      asignado_a,
    };

    await updateTaskInDB(updatedTask);

    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // Task ID
    await deleteTaskFromDB(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};

export const addCommentToTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params; // Task ID
    const { comentario } = req.body;
    const usuario_id = req.user.id; // Get user ID from authenticated user

    const newComment = {
      tarea_id: id,
      usuario_id,
      comentario,
      fecha: new Date(),
    };

    await addCommentToTaskInDB(newComment);

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};

export const getCommentsByTaskId = async (req, res) => {
  try {
    const { id } = req.params; // Task ID
    const comments = await getCommentsByTaskIdFromDB(id);
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get comments' });
  }
};
