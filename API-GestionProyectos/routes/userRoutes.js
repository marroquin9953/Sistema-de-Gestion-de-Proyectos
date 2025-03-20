import express from 'express';
import { body } from 'express-validator';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  requestPasswordReset,
  verifyPasswordResetCode,
  resetPassword,
  getAllRoles,
  createRole,
  getAllPermissions,
  createPermission,
  assignRoleToUser,
} from '../controllers/userController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               carrera_profesional:
 *                 type: string
 *               pais:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 */
router.post('/registro', [
  body('correo').isEmail(),
  body('contraseña').isLength({ min: 6 }),
  body('telefono').isMobilePhone(), // Puedes agregar validaciones adicionales si es necesario
  body('carrera_profesional').notEmpty(),
  body('pais').notEmpty(),
], registerUser);


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión como usuario y devolver el token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               contraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/perfil:
 *   get:
 *     summary: Obtener perfil de usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos de perfil de usuario
 */
router.get('/perfil', authenticateToken, getUserProfile);

/**
 * @swagger
 * /api/perfil:
 *   put:
 *     summary: Actualizar perfil de usuario
*     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               telefono:
 *                 type: string
 *               pais:
 *                 type: string
 *     responses:
 *       200:
 *         description: Actualizar perfil de usuario
 */
router.put('/perfil', authenticateToken, updateUserProfile);

/**
 * @swagger
 * /api/recuperar-password:
 *   post:
 *     summary: Solicitar restablecimiento de contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Código de restablecimiento de contraseña enviado correctamente
 */
router.post('/recuperar-password', requestPasswordReset);

/**
 * @swagger
 * /api/verificar-codigo:
 *   post:
 *     summary: Verificar el código de restablecimiento de contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               codigo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Código de restablecimiento de contraseña verificado exitosamente
 */
router.post('/verificar-codigo', verifyPasswordResetCode);

/**
 * @swagger
 * /api/restablecer-password:
 *   post:
 *     summary: Restablecer contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               codigo:
 *                 type: string
 *               nuevaContraseña:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restablecimiento de contraseña exitoso
 */
router.post('/restablecer-password', resetPassword);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtener todos los roles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles
 */
router.get('/roles', authenticateToken, getAllRoles);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear un nuevo rol (solo administrador)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rol creado exitosamente.
 */
router.post('/roles', authenticateToken, authorizeRole([1]), createRole);

/**
 * @swagger
 * /api/permisos:
 *   get:
 *     summary: Obtener todos los permisos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de permisos
 */
router.get('/permisos', authenticateToken, getAllPermissions);

/**
 * @swagger
 * /api/permisos:
 *   post:
 *     summary: Crear un nuevo permiso (solo administrador)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Permiso creado correctamente
 */
router.post('/permisos', authenticateToken, authorizeRole([1]), createPermission);

/**
 * @swagger
 * /api/asignar-rol:
 *   post:
 *     summary: Asignar un rol a un usuario (solo administrador)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               rol_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Rol asignado exitosamente
 */
router.post('/asignar-rol', authenticateToken, authorizeRole([1]), assignRoleToUser);

export default router;
