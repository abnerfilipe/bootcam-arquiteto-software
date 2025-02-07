export default interface IItemPedidoDTO {
  subtotal: number;
  id?: string;
  productId: string;
  orderId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt?: Date;
}