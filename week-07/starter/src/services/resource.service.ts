import mongoose from 'mongoose';
import { IInstrument } from '../models/resource.model';
import * as resourceRepository from '../repositories/resource.repository';
import { CreateResourceDto, UpdateResourceDto } from '../schemas/resource.schema';
import { AppError } from '../errors/AppError';

export async function getAll(): Promise<IInstrument[]> {
  return resourceRepository.findAll();
}

export async function getById(id: string): Promise<IInstrument> {
  validateId(id);
  const instrument = await resourceRepository.findById(id);
  if (!instrument) throw new AppError(404, 'Instrumento no encontrado');
  return instrument;
}

export async function create(dto: CreateResourceDto, userId: string): Promise<IInstrument> {
  return resourceRepository.create({ ...dto, createdBy: userId });
}

export async function update(id: string, dto: UpdateResourceDto): Promise<IInstrument> {
  await getById(id);
  const instrument = await resourceRepository.updateById(id, dto);
  if (!instrument) throw new AppError(404, 'Instrumento no encontrado');
  return instrument;
}

export async function remove(id: string): Promise<void> {
  validateId(id);
  const deleted = await resourceRepository.deleteById(id);
  if (!deleted) throw new AppError(404, 'Instrumento no encontrado');
}

function validateId(id: string): void {
  if (!mongoose.isValidObjectId(id)) throw new AppError(400, 'ID de instrumento inválido');
}
