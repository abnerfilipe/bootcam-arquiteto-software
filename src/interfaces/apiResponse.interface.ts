export default interface IAPIResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}