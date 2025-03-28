import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';
import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  getAllRolesFromDB,
  createRoleInDB,
  getAllPermissionsFromDB,
  createPermissionInDB,
  assignRoleToUserInDB,
} from '../models/userModel.js';
import { createVerificationCode, getVerificationCode, deleteVerificationCode, } from '../models/verificationModel.js';
import { sendEmail } from '../utils/emailService.js';
import dotenv from 'dotenv';

dotenv.config();

const generateCarnet = (nombres, apellidos) => {
  const iniciales = (nombres.charAt(0) + apellidos.charAt(0)).toUpperCase();
  const uniqueId = Date.now();
  return `${iniciales}-${uniqueId}`;
};

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nombres, apellidos, correo, telefono, carrera_profesional, pais, contraseña } = req.body;

    // Generate carnet_empresarial
    const carnet_empresarial = generateCarnet(nombres, apellidos);

    // Hash password
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Create user
    const newUser = {
      nombres,
      apellidos,
      correo,
      telefono,
      carrera_profesional,
      pais,
      carnet_empresarial,
      contraseña: hashedPassword,
      rol_id: 3, // Default role: Miembro del Equipo
    };

    const user = await createUser(newUser);

    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo registrar el usuario' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Check if user exists
    const user = await getUserByEmail(correo);
    if (!user) {
      return res.status(400).json({ message: 'Credenciales no válidas' });
    }

    // Check password
    const validPassword = await bcrypt.compare(req.body.contraseña, user.contraseña);
    if (!validPassword) {
      return res.status(400).json({ message: 'Credenciales no válidas' });
    }

    // Create and assign a token
    const token = jwt.sign({ id: user.id, rol_id: user.rol_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    res.json({ message: 'Inicie sesión exitosamente', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo iniciar sesión' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo obtener el perfil' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { nombres, apellidos, telefono, carrera_profesional, pais } = req.body;

    const updatedUser = {
      id: req.user.id,
      nombres,
      apellidos,
      telefono,
      carrera_profesional,
      pais,
    };

    await updateUser(updatedUser);

    res.json({ message: 'Perfil actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo actualizar el perfil' });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { correo } = req.body;

    // Check if user exists
    const user = await getUserByEmail(correo);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Generate 6-digit verification code
    const codigo = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
    const expiracion = new Date(Date.now() + 43200000); // 12 hour

    // Store verification code
    await createVerificationCode(user.id, codigo, expiracion);

    // Send email
    const html = `<p>Su código de verificación es: <strong>${codigo}</strong></p>`;
    await sendEmail(correo, 'Solicitud de restablecimiento de contraseña', html);

    res.json({ message: 'Código de restablecimiento de contraseña enviado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo solicitar el restablecimiento de contraseña' });
  }
};

export const verifyPasswordResetCode = async (req, res) => {
  try {
    const { correo, codigo } = req.body;

    // Check if user exists
    const user = await getUserByEmail(correo);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verify verification code
    const verification = await getVerificationCode(user.id, codigo);
    if (!verification || verification.expiracion < new Date()) {
      return res.status(400).json({ message: 'Código de verificación inválido o vencido' });
    }

    res.json({ message: 'Código de restablecimiento de contraseña verificado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo verificar el código de restablecimiento de contraseña' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { correo, codigo, nuevaContraseña } = req.body;

    // Check if user exists
    const user = await getUserByEmail(correo);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verify verification code
    const verification = await getVerificationCode(user.id, codigo);
    if (!verification || verification.expiracion < new Date()) {
      return res.status(400).json({ message: 'Código de verificación inválido o vencido' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);

    // Update password
    await updateUser({ id: user.id, contraseña: hashedPassword });

    // Delete verification code
    await deleteVerificationCode(user.id, codigo);

    res.json({ message: 'Restablecimiento de contraseña exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo restablecer la contraseña' });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const roles = await getAllRolesFromDB();
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se consiguieron los roles' });
  }
};

export const createRole = async (req, res) => {
  try {
    const { nombre } = req.body;
    const newRole = await createRoleInDB(nombre);
    res.status(201).json({ message: 'Rol creado exitosamente', role: newRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo crear el rol' });
  }
};

export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await getAllPermissionsFromDB();
    res.json(permissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudieron obtener los permisos' });
  }
};

export const createPermission = async (req, res) => {
  try {
    const { nombre } = req.body;
    const newPermission = await createPermissionInDB(nombre);
    res.status(201).json({ message: 'Permiso creado exitosamente', permission: newPermission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo crear el permiso' });
  }
};

export const assignRoleToUser = async (req, res) => {
  try {
    const { usuario_id, rol_id } = req.body;
    await assignRoleToUserInDB(usuario_id, rol_id);
    res.json({ message: 'Rol asignado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo asignar el rol' });
  }
};
