import { InstrumentModel, IInstrument } from '../models/resource.model';
import { CreateResourceDto, UpdateResourceDto } from '../schemas/resource.schema';

export async function findAll(): Promise<IInstrument[]> {
  return InstrumentModel.find().sort({ createdAt: -1 });
}

export async function findById(id: string): Promise<IInstrument | null> {
  return InstrumentModel.findById(id);
}

export async function create(data: CreateResourceDto & { createdBy: string }): Promise<IInstrument> {
  return InstrumentModel.create(data);
}

export async function updateById(
  id: string,
  data: UpdateResourceDto
): Promise<IInstrument | null> {
  return InstrumentModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteById(id: string): Promise<boolean> {
  const deleted = await InstrumentModel.findByIdAndDelete(id);
  return deleted !== null;
}
