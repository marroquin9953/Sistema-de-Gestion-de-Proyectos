import pool from '../database.js';

export const createUser = async (user) => {
  const { nombres, apellidos, correo, telefono, carrera_profesional, pais, carnet_empresarial, contraseña, rol_id } = user;
  const [result] = await pool.query(
    'INSERT INTO Usuarios (nombres, apellidos, correo, telefono, carrera_profesional, pais, carnet_empresarial, contraseña, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nombres, apellidos, correo, telefono, carrera_profesional, pais, carnet_empresarial, contraseña, rol_id]
  );
  return { id: result.insertId, ...user };
};

export const getUserByEmail = async (correo) => {
  const [rows] = await pool.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
  return rows[0];
};

export const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Usuarios WHERE id = ?', [id]);
  return rows[0];
};

export const updateUser = async (user) => {
  const { id, nombres, apellidos, telefono, carrera_profesional, pais, contraseña } = user;

  if (contraseña) {
    await pool.query('UPDATE Usuarios SET contraseña = ? WHERE id = ?',
      [contraseña, id]);
  } else {
    await pool.query('UPDATE Usuarios SET nombres = ?, apellidos = ?, telefono = ?, carrera_profesional = ?, pais = ? WHERE id = ?',
      [nombres, apellidos, telefono, carrera_profesional, pais, id]);
  }
};

export const getAllRolesFromDB = async () => {
  const [rows] = await pool.query('SELECT * FROM Roles');
  return rows;
};

export const createRoleInDB = async (nombre) => {
  const [result] = await pool.query('INSERT INTO Roles (nombre) VALUES (?)', [nombre]);
  return { id: result.insertId, nombre };
};

export const getAllPermissionsFromDB = async () => {
  const [rows] = await pool.query('SELECT * FROM Permisos');
  return rows;
};

export const createPermissionInDB = async (nombre) => {
  const [result] = await pool.query('INSERT INTO Permisos (nombre) VALUES (?)', [nombre]);
  return { id: result.insertId, nombre };
};

export const assignRoleToUserInDB = async (usuario_id, rol_id) => {
  await pool.query('UPDATE Usuarios SET rol_id = ? WHERE id = ?', [rol_id, usuario_id]);
};
