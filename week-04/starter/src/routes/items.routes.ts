// ============================================
// ROUTES — registrar los 5 endpoints del recurso
// ============================================

// Configuración de rutas para el recurso de instrumentos musicales

import { Router } from 'express';
import * as controller from '../controllers/items.controller.js';

const router = Router();

// Endpoints CRUD del recurso
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;