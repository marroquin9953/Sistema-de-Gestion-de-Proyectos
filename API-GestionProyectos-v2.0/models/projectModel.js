import pool from '../database.js';

export const createProjectInDB = async (project) => {
  const { nombre, descripcion, fecha_inicio, fecha_fin, gerente_id } = project;
  const [result] = await pool.query(
    'INSERT INTO Proyectos (nombre, descripcion, fecha_inicio, fecha_fin, gerente_id) VALUES (?, ?, ?, ?, ?)',
    [nombre, descripcion, fecha_inicio, fecha_fin, gerente_id]
  );
  return { id: result.insertId, ...project };
};

export const getAllProjectsFromDB = async () => {
  const [rows] = await pool.query('SELECT * FROM Proyectos');
  return rows;
};

export const getProjectByIdFromDB = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Proyectos WHERE id = ?', [id]);
  return rows[0];
};

export const updateProjectInDB = async (project) => {
  const { id, nombre, descripcion, fecha_inicio, fecha_fin, gerente_id } = project;
  await pool.query(
    'UPDATE Proyectos SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, gerente_id = ? WHERE id = ?',
    [nombre, descripcion, fecha_inicio, fecha_fin, gerente_id, id]
  );
};

export const deleteProjectFromDB = async (id) => {
  await pool.query('DELETE FROM Proyectos WHERE id = ?', [id]);
};
