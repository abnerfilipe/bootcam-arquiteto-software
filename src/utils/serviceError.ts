
export default class ServiceError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'ServiceError';
  }
}