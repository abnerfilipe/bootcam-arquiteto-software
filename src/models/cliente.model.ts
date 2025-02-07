import mongoose from 'mongoose';

export interface ICliente extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClienteSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true // Adiciona automaticamente createdAt e updatedAt
});

export default mongoose.model<ICliente>('Cliente', ClienteSchema);