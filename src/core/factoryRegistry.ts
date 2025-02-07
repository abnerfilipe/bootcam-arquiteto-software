import mongoose from 'mongoose';
import { IRepository } from '../interfaces/repository.interface';
import { IService } from '../interfaces/services.interface';
import { ICliente } from '../models/cliente.model';
import { IItemPedido } from '../models/itemPedido.model';
import { IPedido } from '../models/pedido.model';
import { IProduto } from '../models/produto.model';
import FactoryRegistryError from '../utils/factoryRegistryError';
import { BaseRepository } from './baseRepository';
import { BaseService } from './baseService';

type ModelType = {
  Cliente: ICliente;
  Pedido: IPedido;
  Produto: IProduto;
  ItemPedido: IItemPedido;
};
 
export class FactoryRegistry {
  private static repositories: Map<string, IRepository<any>> = new Map();
  private static services: Map<string, IService<any>> = new Map();

  static getRepository<T extends keyof ModelType>(
    modelName: T
  ): IRepository<ModelType[T]> {
    try {
      if (!modelName) {
        throw new FactoryRegistryError('Nome do modelo não fornecido');
      }

      if (!this.repositories.has(modelName)) {
        try {
          const model = mongoose.model<ModelType[T]>(modelName);
          this.repositories.set(modelName, new BaseRepository<ModelType[T]>(model));
        } catch (error) {
          throw new FactoryRegistryError(
            `Erro ao criar repositório para ${modelName}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          );
        }
      }

      const repository = this.repositories.get(modelName);
      if (!repository) {
        throw new FactoryRegistryError(`Repositório não encontrado para ${modelName}`);
      }

      return repository;
    } catch (error) {
      if (error instanceof FactoryRegistryError) {
        throw error;
      }
      throw new FactoryRegistryError(`Erro ao obter repositório: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  static getService<T extends keyof ModelType>(
    modelName: T
  ): IService<ModelType[T]> {
    try {
      if (!modelName) {
        throw new FactoryRegistryError('Nome do modelo não fornecido');
      }

      if (!this.services.has(modelName)) {
        try {
          const repository = this.getRepository(modelName);
          this.services.set(modelName, new BaseService<ModelType[T]>(repository));
        } catch (error) {
          throw new FactoryRegistryError(
            `Erro ao criar serviço para ${modelName}: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
          );
        }
      }

      const service = this.services.get(modelName);
      if (!service) {
        throw new FactoryRegistryError(`Serviço não encontrado para ${modelName}`);
      }

      return service;
    } catch (error) {
      if (error instanceof FactoryRegistryError) {
        throw error;
      }
      throw new FactoryRegistryError(`Erro ao obter serviço: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  static clearInstances(): void {
    try {
      this.repositories.clear();
      this.services.clear();
    } catch (error) {
      throw new FactoryRegistryError(
        `Erro ao limpar instâncias: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      );
    }
  }
}