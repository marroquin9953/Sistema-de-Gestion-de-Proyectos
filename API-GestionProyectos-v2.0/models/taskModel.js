import pool from '../database.js';

export const createTaskInDB = async (task) => {
  const { nombre, descripcion, estado, proyecto_id, asignado_a } = task;
  const [result] = await pool.query(
    'INSERT INTO Tareas (nombre, descripcion, estado, proyecto_id, asignado_a) VALUES (?, ?, ?, ?, ?)',
    [nombre, descripcion, estado, proyecto_id, asignado_a]
  );
  return { id: result.insertId, ...task };
};

export const getAllTasksByProjectIdFromDB = async (proyecto_id) => {
  const [rows] = await pool.query('SELECT * FROM Tareas WHERE proyecto_id = ?', [proyecto_id]);
  return rows;
};

export const updateTaskInDB = async (task) => {
  const { id, nombre, descripcion, estado, asignado_a } = task;
  await pool.query(
    'UPDATE Tareas SET nombre = ?, descripcion = ?, estado = ?, asignado_a = ? WHERE id = ?',
    [nombre, descripcion, estado, asignado_a, id]
  );
};

export const deleteTaskFromDB = async (id) => {
  await pool.query('DELETE FROM Tareas WHERE id = ?', [id]);
};

export const addCommentToTaskInDB = async (comment) => {
  const { tarea_id, usuario_id, comentario, fecha } = comment;
  await pool.query(
    'INSERT INTO Comentarios (tarea_id, usuario_id, comentario, fecha) VALUES (?, ?, ?, ?)',
    [tarea_id, usuario_id, comentario, fecha]
  );
};

export const getCommentsByTaskIdFromDB = async (tarea_id) => {
  const [rows] = await pool.query('SELECT * FROM Comentarios WHERE tarea_id = ?', [tarea_id]);
  return rows;
};
