import IItemPedidoDTO from '../interfaces/itemPedido.interface';
import { IRepository } from '../interfaces/repository.interface';
import { IService } from '../interfaces/services.interface';
import { IItemPedido } from '../models/itemPedido.model';
import { ProdutoService } from './produto.service';
import mongoose from 'mongoose';

export class ItemPedidoService implements IService<IItemPedido>{
  constructor(
    private readonly repository: IRepository<IItemPedido>,
    private readonly produtoService: ProdutoService
  ) {}
  async create(data: Partial<IItemPedido>): Promise<IItemPedido> {
    const produto = await this.produtoService.findById(data.productId!.toString());
    if (!produto) throw new Error('Produto não encontrado');
  
    const novoItem: Partial<IItemPedido> = {
      productId: new mongoose.Types.ObjectId(data.productId),
      quantity: data.quantity,
      price: produto.price,
      orderId: new mongoose.Types.ObjectId(data.orderId),
      createdAt: new Date()
    };
  
    const itemCriado = await this.repository.create(novoItem);
    return itemCriado;
  }
  async findById(id: string): Promise<IItemPedido | null> {
   return await this.repository.findById(id);
  }
  async findAll(): Promise<IItemPedido[]> {
    return await this.repository.findAll()
  }
  async update(id: string, data: Partial<IItemPedido>): Promise<IItemPedido> {
    return await this.repository.update(id, data);
  }
  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async contarItens(): Promise<number> {
    const itens = await this.repository.findAll();
    return itens.length;
  }

  private converterParaDTO(item: IItemPedido): IItemPedidoDTO {
    return {
      id: item._id.toString(),
      productId: item.productId.toString(),
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity,
      createdAt: item.createdAt,
      orderId: item.orderId?.toString() || ''
    };
  }
  
  async buscarPorPedidoId(pedidoId: string): Promise<IItemPedidoDTO[]> {
    const itens = await this.repository.findAll();
    const itensDoPedido = itens.filter(item => 
      item.orderId?.toString() === pedidoId
    );
    return itensDoPedido.map(item => this.converterParaDTO(item));
  }
}