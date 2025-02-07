import mongoose from 'mongoose';

export interface IItemPedido extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const ItemPedidoSchema = new mongoose.Schema({
  orderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pedido', 
    required: true 
  },
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Produto', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  }
}, {
  timestamps: true // Adiciona automaticamente createdAt e updatedAt
});

export default mongoose.model<IItemPedido>('ItemPedido', ItemPedidoSchema);