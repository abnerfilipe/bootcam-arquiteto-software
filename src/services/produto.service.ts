import { IRepository } from '../interfaces/repository.interface';
import { IProduto } from '../models/produto.model';
import IProdutoDTO from '../interfaces/produto.interface';
import { IService } from '../interfaces/services.interface';

export class ProdutoService implements IService<IProduto>{
  constructor(private readonly repository: IRepository<IProduto>) {}
  create(data: Partial<IProduto>): Promise<IProduto> {
    return this.repository.create(data as IProduto);
  }
  findById(id: string): Promise<IProduto | null> {
    return this.repository.findById(id);
  }
  findAll(): Promise<IProduto[]> {
    return this.repository.findAll();
  }
  update(id: string, data: Partial<IProduto>): Promise<IProduto> {
    return this.repository.update(id, data as Partial<IProduto>);
  }
  delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async buscarPorNome(nome: string): Promise<IProdutoDTO[]> {
    const produtos = await this.repository.findAll();
    return produtos.filter(p => p.name.toLowerCase().includes(nome.toLowerCase()));
  }

  async contarProdutos(): Promise<number> {
    const produtos = await this.repository.findAll();
    return produtos.length;
  }
}