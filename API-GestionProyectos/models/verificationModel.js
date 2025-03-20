import pool from '../database.js';

export const createVerificationCode = async (usuario_id, codigo, expiracion) => {
  await pool.query(
    'INSERT INTO Codigos_Verificacion (usuario_id, codigo, expiracion) VALUES (?, ?, ?)',
    [usuario_id, codigo, expiracion]
  );
};

export const getVerificationCode = async (usuario_id, codigo) => {
  const [rows] = await pool.query(
    'SELECT * FROM Codigos_Verificacion WHERE usuario_id = ? AND codigo = ?',
    [usuario_id, codigo]
  );
  return rows[0];
};

export const deleteVerificationCode = async (usuario_id, codigo) => {
  await pool.query(
    'DELETE FROM Codigos_Verificacion WHERE usuario_id = ? AND codigo = ?',
    [usuario_id, codigo]
  );
};
