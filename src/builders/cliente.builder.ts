import { ICliente } from '../models/cliente.model';

export class ClienteBuilder {
  private cliente: Partial<ICliente> = {};

  setName(name: string): ClienteBuilder {
    this.cliente.name = name;
    return this;
  }

  setEmail(email: string): ClienteBuilder {
    this.cliente.email = email;
    return this;
  }

  setPhone(phone: string): ClienteBuilder {
    this.cliente.phone = phone;
    return this;
  }

  setAddress(address: string): ClienteBuilder {
    this.cliente.address = address;
    return this;
  }

  build(): ICliente {
    return this.cliente as ICliente;
  }
}