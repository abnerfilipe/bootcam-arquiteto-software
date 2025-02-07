import APIResponse from '../interfaces/apiResponse.interface'

export class ResponseBuilder<T> {
  private response: APIResponse<T> = {
    statusCode: 200
  };

  setData(data: T): ResponseBuilder<T> {
    this.response.data = data;
    return this;
  }

  setMessage(message: string): ResponseBuilder<T> {
    this.response.message = message;
    return this;
  }

  setError(error: any): ResponseBuilder<T> {
    this.response.error = error;
    return this;
  }

  setStatusCode(statusCode: number): ResponseBuilder<T> {
    this.response.statusCode = statusCode;
    return this;
  }

  build(): APIResponse<T> {
    return this.response;
  }
}