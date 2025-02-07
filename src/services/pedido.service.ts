import { IRepository } from '../interfaces/repository.interface';
import { IPedido } from '../models/pedido.model';
import IItemPedidoDTO from '../interfaces/itemPedido.interface';
import IPedidoDTO from '../interfaces/pedido.interface';
import mongoose from 'mongoose';
import { PedidoStatus } from '../interfaces/pedido.interface';
import { ProdutoService } from './produto.service';
import { ItemPedidoService } from './itemPedido.service';
import { IItemPedido } from '../models/itemPedido.model';
import { IService } from '../interfaces/services.interface';

export class PedidoService implements IService<IPedido> {
  constructor(
    private readonly repository: IRepository<IPedido>,
    private readonly itemPedidoService: ItemPedidoService,
    private readonly produtoService: ProdutoService
  ) {}
  async create(data: Partial<IPedido>): Promise<IPedido> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<IPedido | null> {
    return await this.repository.findById(id);
  }
  async findAll(): Promise<IPedido[]> { 
    return await this.repository.findAll();
  }
  async update(id: string, data: Partial<IPedido>): Promise<IPedido> {
    return await this.repository.update(id, data as Partial<IPedido>);
  }
  async delete(id: string): Promise<boolean> {
    const itens = await this.itemPedidoService.buscarPorPedidoId(id);
    await Promise.all(itens.map(item => this.itemPedidoService.delete(item.id!)));
    return this.repository.delete(id);
  }

  async criarPedido(clienteId: string, itens: { produtoId: string; quantidade: number }[]): Promise<Partial<IPedidoDTO>> {
    // Cria o pedido inicial sem itens
    const pedidoInicial: Partial<IPedido> = {
      customerId: new mongoose.Types.ObjectId(clienteId),
      items: [],
      totalPrice: 0,
      status: PedidoStatus.PENDENTE,
      createdAt: new Date()
    };
  
    // Cria o pedido no banco
    const pedidoCriado = await this.repository.create(pedidoInicial);
  
     // Cria os itens do pedido com o pedidoId e converte para DTO
  const itensPedidoDTO = await Promise.all(
    itens.map(async ({ produtoId, quantidade }) => {
      const produto = await this.produtoService.findById(produtoId);
      if (!produto) throw new Error(`Produto não encontrado: ${produtoId}`);

      const itemPedido = await this.itemPedidoService.create({
        produtoId, 
        quantidade,
        orderId: pedidoCriado._id,
        price: produto.price,
      } as Partial<IItemPedido>);
      
      if (!itemPedido) throw new Error(`Falha ao criar item do pedido: ${produtoId}`);

      // Converter para DTO
      return {
        id: itemPedido._id.toString(),
        produtoId: itemPedido.productId.toString(),
        orderId: itemPedido.orderId.toString(),
        quantidade: itemPedido.quantity,
        price: itemPedido.price
      } as unknown as IItemPedidoDTO;
    })
  );

  // Calcula o total usando os DTOs
  const total = itensPedidoDTO.reduce((acc, item) => acc + item.price, 0);

  // Atualiza o pedido com os itens e total
  const pedidoAtualizado = await this.repository.update(pedidoCriado._id.toString(), {
    items: itensPedidoDTO.map(item => new mongoose.Types.ObjectId(item.id)),
    totalPrice: total
  });

  return this.converterParaDTO(pedidoAtualizado!, itensPedidoDTO);
}

  async buscarPorClienteId(clienteId: string): Promise<IPedidoDTO[]> {
    const pedidos = await this.repository.findAll();
    const pedidosDoCliente = pedidos.filter(p => 
      p.customerId.toString() === clienteId
    );
    
    return Promise.all(
      pedidosDoCliente.map(async pedido => {
        const itens = await this.itemPedidoService.buscarPorPedidoId(pedido._id.toString());
        return this.converterParaDTO(pedido, itens);
      })
    );
  }


  async contarPedidos(): Promise<number> {
    const pedidos = await this.repository.findAll();
    return pedidos.length;
  }

  private converterParaDTO(pedido: IPedido, itens: IItemPedidoDTO[]): IPedidoDTO {
    return {
      _id: pedido._id,
      id: pedido._id.toString(),
      customerId: pedido.customerId.toString(),
      items: itens,  // Simplificado: já recebemos os itens no formato DTO
      totalPrice: pedido.totalPrice,
      status: pedido.status as PedidoStatus,
      createdAt: pedido.createdAt
    };
  }
}