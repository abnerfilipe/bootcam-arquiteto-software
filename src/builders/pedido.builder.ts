import { IPedido } from '../models/pedido.model';
import mongoose from 'mongoose';

export class PedidoBuilder {
  private pedido: Partial<IPedido> = { items: [] };

  setCustomerId(customerId: mongoose.Types.ObjectId): PedidoBuilder {
    this.pedido.customerId = customerId;
    return this;
  }

  setItems(items: mongoose.Types.ObjectId[]): PedidoBuilder {
    this.pedido.items = items;
    return this;
  }

  setTotalPrice(totalPrice: number): PedidoBuilder {
    this.pedido.totalPrice = totalPrice;
    return this;
  }

  setStatus(status: string): PedidoBuilder {
    this.pedido.status = status;
    return this;
  }

  build(): IPedido {
    return this.pedido as IPedido;
  }
}