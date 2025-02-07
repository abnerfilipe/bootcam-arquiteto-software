import { IRepository } from '../interfaces/repository.interface';
import Produto, { IProduto } from '../models/produto.model';

export class ProdutoRepository implements IRepository<IProduto> {
  async create(produto: IProduto): Promise<IProduto> {
    return await Produto.create(produto);
  }

  async findById(id: string): Promise<IProduto | null> {
    return await Produto.findById(id);
  }

  async findAll(): Promise<IProduto[]> {
    return await Produto.find({});
  }

  async update(id: string, produto: IProduto): Promise<IProduto | null> {
    return await Produto.findByIdAndUpdate(id, produto, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Produto.findByIdAndDelete(id);
    return !!result;
  }

  async findBySku(sku: string): Promise<IProduto | null> {
    return await Produto.findOne({ sku: sku });
  }
}