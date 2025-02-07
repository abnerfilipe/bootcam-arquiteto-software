import { NullExpression } from "mongoose";
import { ResponseBuilder } from "../builders/response.builder";
import APIResponse from "../interfaces/apiResponse.interface";

// Funções auxiliares para respostas comuns
export const successResponse = <T>(data: T, message?: string, statusCode: number = 200): APIResponse<T> => {
  const builder = new ResponseBuilder<T>()
    .setData(data)
    .setStatusCode(statusCode);
    
  if (message) {
    builder.setMessage(message);
  }
  
  return builder.build();
};

export const errorResponse = (error: any,message: string = '', statusCode: number = 400): APIResponse<null> => {
  const builder = new ResponseBuilder<null>()
    .setMessage(message)
    .setError(error.stack ? error.stack : error)
    .setStatusCode(statusCode);
  
  return builder.build();
};
