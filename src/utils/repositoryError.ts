
export class RepositoryError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'RepositoryError';
  }
}