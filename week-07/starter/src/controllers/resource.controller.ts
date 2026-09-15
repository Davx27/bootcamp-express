import { Request, Response, NextFunction } from 'express';
import * as resourceService from '../services/resource.service';
import { createResourceSchema, updateResourceSchema } from '../schemas/resource.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.status(200).json(await resourceService.getAll());
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.status(200).json(await resourceService.getById(String(req.params.id)));
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createResourceSchema.parse(req.body);
    const instrument = await resourceService.create(dto, req.user!.sub);
    res.status(201).json(instrument);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = updateResourceSchema.parse(req.body);
    res.status(200).json(await resourceService.update(String(req.params.id), dto));
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await resourceService.remove(String(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
