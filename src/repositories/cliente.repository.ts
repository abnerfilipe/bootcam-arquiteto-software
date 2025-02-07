import { IRepository } from '../interfaces/repository.interface';
import Cliente, { ICliente } from '../models/cliente.model';

export class ClienteRepository implements IRepository<ICliente> {
  async create(cliente: ICliente): Promise<ICliente> {
    return await Cliente.create(cliente);
  }

  async findById(id: string): Promise<ICliente | null> {
    return await Cliente.findById(id);
  }

  async findAll(): Promise<ICliente[]> {
    return await Cliente.find({});
  }

  async update(id: string, cliente: ICliente): Promise<ICliente | null> {
    return await Cliente.findByIdAndUpdate(id, cliente, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Cliente.findByIdAndDelete(id);
    return !!result;
  }

  async findByEmail(email: string): Promise<ICliente | null> {
    return await Cliente.findOne({ email: email });
  }
}