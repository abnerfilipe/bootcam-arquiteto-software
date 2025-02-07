import { IRepository } from '../interfaces/repository.interface';
import Pedido, { IPedido } from '../models/pedido.model';

export class PedidoRepository implements IRepository<IPedido> {
  async create(pedido: IPedido): Promise<IPedido> {
    return await Pedido.create(pedido);
  }

  async findById(id: string): Promise<IPedido | null> {
    return await Pedido.findById(id)
      .populate('customerId')
      .populate('items');
  }

  async findAll(): Promise<IPedido[]> {
    return await Pedido.find({})
      .populate('customerId')
      .populate('items');
  }

  async update(id: string, pedido: IPedido): Promise<IPedido | null> {
    return await Pedido.findByIdAndUpdate(id, pedido, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Pedido.findByIdAndDelete(id);
    return !!result;
  }

  async findByCustomerId(customerId: string): Promise<IPedido[]> {
    return await Pedido.find({ customerId: customerId })
      .populate('items');
  }

  async updateStatus(id: string, status: string): Promise<IPedido | null> {
    return await Pedido.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
  }
}