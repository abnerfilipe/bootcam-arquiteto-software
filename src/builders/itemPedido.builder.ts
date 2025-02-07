import { IItemPedido } from '../models/itemPedido.model';
import mongoose from 'mongoose';

export class ItemPedidoBuilder {
  private itemPedido: Partial<IItemPedido> = {};

  setOrderId(orderId: mongoose.Types.ObjectId): ItemPedidoBuilder {
    this.itemPedido.orderId = orderId;
    return this;
  }

  setProductId(productId: mongoose.Types.ObjectId): ItemPedidoBuilder {
    this.itemPedido.productId = productId;
    return this;
  }

  setQuantity(quantity: number): ItemPedidoBuilder {
    this.itemPedido.quantity = quantity;
    return this;
  }

  setPrice(price: number): ItemPedidoBuilder {
    this.itemPedido.price = price;
    return this;
  }

  build(): IItemPedido {
    return this.itemPedido as IItemPedido;
  }
}
