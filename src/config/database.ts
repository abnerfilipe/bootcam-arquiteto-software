import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import IDatabase from '../interfaces/database.interface';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

class Database implements IDatabase {
  private static instance: Database | null = null;
  private _isConnected: boolean = false;
  private _retryAttempts: number = 3;
  
  private constructor() {
    if (Database.instance !== null) {
      throw new Error('Use Database.getInstance()');
    }
    
    mongoose.connection.on("connected", () => {
      console.info("Banco de Dados Conectado");
      this._isConnected = true;
    });

    mongoose.connection.on("error", (err) => {
      console.error("Banco de Dados Com Erro", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.info("Banco de Dados Desconectado");
      this._isConnected = false;
    });
  }

  get isConnected(): boolean {
    return this._isConnected;
  }

  get retryAttempts(): number {
    return this._retryAttempts;
  }

  private decrementRetryAttempts(): void {
    this._retryAttempts--;
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  
  public async connect(): Promise<void> {
    if (this._isConnected) return;

    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('MONGODB_URI não está definido no arquivo .env');
    }

    const clientOptions: ConnectOptions = { 
      autoIndex: true,
      serverSelectionTimeoutMS: 6000000, 
      socketTimeoutMS: 7500000, 
      connectTimeoutMS: 3000000, 
      maxPoolSize: 100,
      minPoolSize: 0,
      maxIdleTimeMS: 100000
    };

    try {
      await mongoose.connect(uri, clientOptions);
    } catch (error) {
      if (this._retryAttempts > 0) {
        this.decrementRetryAttempts();
        console.log(`Tentando reconectar... Tentativas restantes: ${this._retryAttempts}`);
        await new Promise(resolve => setTimeout(resolve, 5000));
        return this.connect();
      }
      console.error('Erro ao conectar com MongoDB:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this._isConnected) return;
    
    try {
      await mongoose.disconnect();
      this._isConnected = false;
      console.log("Desconectado do MongoDB");
    } catch (error) {
      console.error('Erro ao desconectar:', error);
      throw error;
    }
  }
}


export default Database.getInstance();