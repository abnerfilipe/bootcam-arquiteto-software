export default interface IDatabase {
  readonly isConnected: boolean;

  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export interface IDatabaseConstructor {
  getInstance(): IDatabase;
}