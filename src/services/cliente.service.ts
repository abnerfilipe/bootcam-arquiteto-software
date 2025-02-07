import { IRepository } from '../interfaces/repository.interface';
import { ICliente } from '../models/cliente.model';
import IClienteDTO from '../interfaces/cliente.interface';
import { IService } from '../interfaces/services.interface';

export class ClienteService implements IService<ICliente>{
  constructor(private readonly repository: IRepository<ICliente>) {}
  create(data: Partial<ICliente>): Promise<ICliente> {
    return this.repository.create(data as ICliente);
  }
  findById(id: string): Promise<ICliente | null> {
    return this.repository.findById(id);
  }
  findAll(): Promise<ICliente[]> {
    return this.repository.findAll();
  }
  update(id: string, data: Partial<ICliente>): Promise<ICliente> {
    return this.repository.update(id, data as Partial<ICliente>);
  }
  delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async buscarPorNome(nome: string): Promise<ICliente[]> {
    const clientes = await this.repository.findAll();
    return clientes.filter(c => c.name.toLowerCase().includes(nome.toLowerCase()));
  }

  async contarClientes(): Promise<number> {
    const clientes = await this.repository.findAll();
    return clientes.length;
  }
}