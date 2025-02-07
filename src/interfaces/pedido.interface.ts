import IItemPedidoDTO from "./itemPedido.interface";
import mongoose from "mongoose";

export enum PedidoStatus {
  PENDENTE = 'pendente',
  APROVADO = 'aprovado',
  REJEITADO = 'rejeitado'
}

export default interface IPedidoDTO {
  _id: mongoose.Types.ObjectId;
  id?: string;
  customerId: string;
  items: IItemPedidoDTO[] | mongoose.Types.ObjectId[];
  totalPrice: number;
  status: PedidoStatus;
  createdAt: Date;
  updatedAt?: Date;
}