export default interface IClienteDTO {
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt?: Date;
}