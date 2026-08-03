import { Router } from 'express';
import * as store from '../store.js';
import type { CreateItemDto, UpdateItemDto } from '../types.js';

export const itemsRouter = Router();

// GET /api/v1/items — Listar todos los recursos
// Status: 200
itemsRouter.get('/', (_req, res) => {
  const items = store.getAll();
  res.status(200).json(items);
});

// GET /api/v1/items/:id — Obtener recurso por ID
// Status: 200 si existe | 404 si no existe
itemsRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: 'El ID debe ser un número válido' });
    return;
  }

  const item = store.getById(id);

  if (!item) {
    res.status(404).json({ error: `Instrumento con ID ${id} no encontrado` });
    return;
  }

  res.status(200).json(item);
});

// POST /api/v1/items — Crear nuevo recurso
// Status: 201 con el recurso creado
itemsRouter.post('/', (req, res) => {
  const dto: CreateItemDto = req.body;

  // Validación básica de campos requeridos
  if (!dto.name || !dto.brand) {
    res.status(400).json({ error: 'Los campos name y brand son obligatorios' });
    return;
  }

  const newItem = store.create(dto);
  res.status(201).json(newItem);
});

// PUT /api/v1/items/:id — Actualizar recurso
// Status: 200 con el recurso actualizado | 404 si no existe
itemsRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: 'El ID debe ser un número válido' });
    return;
  }

  const dto: UpdateItemDto = req.body;
  const updatedItem = store.update(id, dto);

  if (!updatedItem) {
    res.status(404).json({ error: `Instrumento con ID ${id} no encontrado` });
    return;
  }

  res.status(200).json(updatedItem);
});

// DELETE /api/v1/items/:id — Eliminar recurso
// Status: 204 sin body | 404 si no existe
itemsRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: 'El ID debe ser un número válido' });
    return;
  }

  const deleted = store.remove(id);

  if (!deleted) {
    res.status(404).json({ error: `Instrumento con ID ${id} no encontrado` });
    return;
  }

  // 204 No Content se envía sin body (.send() sin argumentos)
  res.status(204).send();
});