import mongoose from 'mongoose';
export type PedidoStatus = 'pendente' | 'pago' | 'enviado' | 'entregue' | 'cancelado';

export const PedidoStatusEnum = {
  PENDENTE: 'pendente' as PedidoStatus,
  PAGO: 'pago' as PedidoStatus,
  ENVIADO: 'enviado' as PedidoStatus,
  ENTREGUE: 'entregue' as PedidoStatus,
  CANCELADO: 'cancelado' as PedidoStatus
} as const;

export interface IPedido extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  items: mongoose.Types.ObjectId[];
  totalPrice: number;
  status: PedidoStatus;
  createdAt: Date;
  updatedAt: Date;
}

const PedidoSchema = new mongoose.Schema({
  customerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cliente', 
    required: true 
  },
  items: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ItemPedido'
  }],
  totalPrice: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    required: true,
    enum: Object.values(PedidoStatusEnum),
    default: PedidoStatusEnum.PENDENTE,
    validate: {
      validator: (value: string) => Object.values(PedidoStatusEnum).includes(value as PedidoStatus),
      message: 'Status inválido'
    }
  }
}, {
  timestamps: true
});

export default mongoose.model<IPedido>('Pedido', PedidoSchema);