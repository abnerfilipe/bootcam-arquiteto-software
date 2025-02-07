import { IRepository } from '../interfaces/repository.interface';
import { RepositoryError } from '../utils/repositoryError';
import ServiceError from '../utils/serviceError';


export class BaseService<T> {
  constructor(protected repository: IRepository<T>) {}

  async create(data: Partial<T>): Promise<T> {
    try {
      return await this.repository.create(data as T);
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw new ServiceError(`Erro ao criar: ${error.message}`, error);
      }
      throw new ServiceError('Erro inesperado ao criar item', error as Error);
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      const item = await this.repository.findById(id);
      if (!item) {
        throw new ServiceError('Item não encontrado');
      }
      return item;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw new ServiceError(`Erro ao buscar: ${error.message}`, error);
      }
      throw new ServiceError('Erro inesperado ao buscar item', error as Error);
    }
  }

  async findAll(): Promise<T[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw new ServiceError(`Erro ao listar: ${error.message}`, error);
      }
      throw new ServiceError('Erro inesperado ao listar itens', error as Error);
    }
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      const updated = await this.repository.update(id, data);
      if (!updated) {
        throw new ServiceError('Item não encontrado');
      }
      return updated;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw new ServiceError(`Erro ao atualizar: ${error.message}`, error);
      }
      throw new ServiceError('Erro inesperado ao atualizar item', error as Error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw new ServiceError(`Erro ao deletar: ${error.message}`, error);
      }
      throw new ServiceError('Erro inesperado ao deletar item', error as Error);
    }
  }
}