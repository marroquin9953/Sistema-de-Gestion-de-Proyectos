import express from 'express';
import { body } from 'express-validator';
import {
  createTask,
  getAllTasksByProjectId,
  updateTask,
  deleteTask,
  addCommentToTask,
  getCommentsByTaskId,
} from '../controllers/taskController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/proyectos/{id}/tareas:
 *   post:
 *     summary: Crear una tarea dentro de un proyecto (solo Gerente de Proyecto o Administrador)
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
 *               estado:
 *                 type: string
 *               asignado_a:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 */
router.post('/proyectos/:id/tareas', authenticateToken, authorizeRole([1, 2]), [
  body('nombre').notEmpty(),
  body('estado').isIn(['Pendiente', 'En progreso', 'Completada']),
  body('asignado_a').isInt().optional(),
], createTask);

/**
 * @swagger
 * /api/proyectos/{id}/tareas:
 *   get:
 *     summary: Enumerar todas las tareas de un proyecto
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
 *         description: List of tasks
 */
router.get('/proyectos/:id/tareas', authenticateToken, getAllTasksByProjectId);

/**
 * @swagger
 * /api/tareas/{id}:
 *   put:
 *     summary: Editar una tarea (solo Gerente de Proyecto o Administrador)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
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
 *               estado:
 *                 type: string
 *               asignado_a:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 */
router.put('/:id', authenticateToken, authorizeRole([1, 2]), [
  body('nombre').notEmpty(),
  body('estado').isIn(['Pendiente', 'En progreso', 'Completada']),
  body('asignado_a').isInt().optional(),
], updateTask);

/**
 * @swagger
 * /api/tareas/{id}:
 *   delete:
 *     summary: Eliminar una tarea (solo Gerente de Proyecto o Administrador)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 */
router.delete('/:id', authenticateToken, authorizeRole([1, 2]), deleteTask);

/**
 * @swagger
 * /api/tareas/{id}/comentarios:
 *   post:
 *     summary: Agregar un comentario a una tarea
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comentario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentario agregado exitosamente
 */
router.post('/:id/comentarios', authenticateToken, [
  body('comentario').notEmpty(),
], addCommentToTask);

/**
 * @swagger
 * /api/tareas/{id}/comentarios:
 *   get:
 *     summary: Listar todos los comentarios de una tarea
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Lista de comentarios
 */
router.get('/:id/comentarios', authenticateToken, getCommentsByTaskId);

export default router;
