import { IRepository } from '../interfaces/repository.interface';
import ItemPedido, { IItemPedido } from '../models/itemPedido.model';

export class ItemPedidoRepository implements IRepository<IItemPedido> {
  async create(item: IItemPedido): Promise<IItemPedido> {
    return await ItemPedido.create(item);
  }

  async findById(id: string): Promise<IItemPedido | null> {
    return await ItemPedido.findById(id)
      .populate('orderId')
      .populate('productId');
  }

  async findAll(): Promise<IItemPedido[]> {
    return await ItemPedido.find({})
      .populate('orderId')
      .populate('productId');
  }

  async update(id: string, item: IItemPedido): Promise<IItemPedido | null> {
    return await ItemPedido.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await ItemPedido.findByIdAndDelete(id);
    return !!result;
  }

  async findByOrderId(orderId: string): Promise<IItemPedido[]> {
    return await ItemPedido.find({ orderId: orderId })
      .populate('productId');
  }
}