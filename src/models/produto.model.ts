import mongoose from 'mongoose';

export interface IProduto extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  image: string;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProdutoSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  sku: { 
    type: String, 
    required: true,
    unique: true 
  }
}, {
  timestamps: true // Adiciona automaticamente createdAt e updatedAt
});

export default mongoose.model<IProduto>('Produto', ProdutoSchema);