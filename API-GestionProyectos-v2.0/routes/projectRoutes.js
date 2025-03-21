import express from 'express';
import { body, validationResult } from 'express-validator';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/proyectos:
 *   post:
 *     summary: Crear un nuevo proyecto (solo Gerente de Proyecto o Admin)
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
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *               gerente_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 */
router.post('/', authenticateToken, authorizeRole([1, 2]), [
  body('nombre').notEmpty(),
  body('fecha_inicio').isISO8601().toDate(),
  body('fecha_fin').isISO8601().toDate(),
  body('gerente_id').isInt(),
], createProject);

/**
 * @swagger
 * /api/proyectos:
 *   get:
 *     summary: Listar todos los proyectos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de proyectos
 */
router.get('/', authenticateToken, getAllProjects);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   get:
 *     summary: Obtenga detalles de un proyecto específico
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Detalles del proyecto
 */
router.get('/:id', authenticateToken, getProjectById);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   put:
 *     summary: Editar un proyecto (solo Gerente de Proyecto o Administrador)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *               gerente_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Proyecto actualizado exitosamente
 */
router.put('/:id', authenticateToken, authorizeRole([1, 2]), [
  body('nombre').notEmpty(),
  body('fecha_inicio').isISO8601().toDate(),
  body('fecha_fin').isISO8601().toDate(),
  body('gerente_id').isInt(),
], updateProject);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   delete:
 *     summary: Eliminar un proyecto (solo Gerente de Proyecto o Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Proyecto eliminado exitosamente
 */
router.delete('/:id', authenticateToken, authorizeRole([1, 2]), deleteProject);

export default router;
