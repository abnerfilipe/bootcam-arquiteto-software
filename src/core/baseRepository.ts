import { Document,Model,Error as MongooseError,UpdateQuery as MongooseUpdateQuery } from 'mongoose';
import database from '../config/database';
import { RepositoryError } from '../utils/repositoryError';

type DocumentResult<T> = T & Document;
type LeanResult<T> = Omit<DocumentResult<T>, keyof Document>;

export class BaseRepository<T> {
  constructor(private model: Model<DocumentResult<T>>) {}

   private async checkConnection(): Promise<boolean> {
    if (!database.isConnected) {
      throw new RepositoryError(
        'Banco de dados não está conectado',
        new Error('Database not connected')
      );
    }
    return true;
  }

  async create(item: Partial<T>): Promise<LeanResult<T>> {
    try {
      await this.checkConnection();
      const created = await this.model.create(item);
      return created.toObject();
    } catch (error) {
      if (error instanceof MongooseError.ValidationError) {
        throw new RepositoryError('Erro de validação ao criar item', error);
      }
      if (error instanceof RepositoryError) {
        throw error;
      }
      if (error instanceof Error && error.message.includes('buffering timed out')) {
        throw new RepositoryError(
          'Timeout ao tentar conectar com o banco de dados',
          error
        );
      }
      throw new RepositoryError('Erro ao criar item no banco de dados', error as Error);
    }
  }

  async findById(id: string): Promise<LeanResult<T> | null> {
    try {
      await this.checkConnection();
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new RepositoryError('ID inválido');
      }
      const doc = await this.model.findById(id).lean();
      return doc as LeanResult<T> | null;
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError('Erro ao buscar item por ID', error as Error);
    }
  }

  async findAll(): Promise<LeanResult<T>[]> {
    try {
      await this.checkConnection();
      const docs = await this.model.find({}).lean();
      return docs as LeanResult<T>[];
    } catch (error) {
      throw new RepositoryError('Erro ao buscar todos os itens', error as Error);
    }
  }

  async update(id: string, item: Partial<T>): Promise<LeanResult<T> > {
    try {
      await this.checkConnection();
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new RepositoryError('ID inválido');
      }
      
      const updateQuery: MongooseUpdateQuery<DocumentResult<T>> = { $set: item as any };
      
      const updated = await this.model.findByIdAndUpdate(
        id,
        updateQuery,
        { new: true, runValidators: true }
      ).lean();
      
      if (!updated) {
        throw new RepositoryError('Item não encontrado');
      }
      
      return updated as LeanResult<T>;
    } catch (error) {
      if (error instanceof MongooseError.ValidationError) {
        throw new RepositoryError('Erro de validação ao atualizar item', error);
      }
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError('Erro ao atualizar item', error as Error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.checkConnection();
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new RepositoryError('ID inválido');
      }
      const result = await this.model.findByIdAndDelete(id);
      if (!result) {
        throw new RepositoryError('Item não encontrado');
      }
      return true;
    } catch (error) {
      if (error instanceof RepositoryError) throw error;
      throw new RepositoryError('Erro ao deletar item', error as Error);
    }
  }
}