export default class FactoryRegistryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FactoryRegistryError';
  }
}
