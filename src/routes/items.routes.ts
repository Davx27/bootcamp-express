// src/routes/items.routes.ts — Definición de rutas del recurso
// ============================================================
// TODO: Definir las rutas CRUD para tu recurso
// src/routes/items.routes.ts — Definición de rutas del recurso

import { Router } from 'express';
import { ItemsController } from '../controllers/items.controller.js';

const router = Router();
const controller = new ItemsController();

router.get('/', (req, res, next) => controller.getAll(req, res, next));
router.get('/:id', (req, res, next) => controller.getById(req, res, next));
router.post('/', (req, res, next) => controller.create(req, res, next));
router.put('/:id', (req, res, next) => controller.update(req, res, next));
router.delete('/:id', (req, res, next) => controller.remove(req, res, next));

export default router;
