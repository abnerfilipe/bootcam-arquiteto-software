export default interface IProdutoDTO {
  name: string;
  price: number;
  description: string;
  image: string;
  sku: string;
  createdAt: Date;
  updatedAt?: Date;
}