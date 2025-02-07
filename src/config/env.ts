import Joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

interface EnvVars {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;
  MONGO_URI: string;
}

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.string().default('3000'),
  MONGO_URI: Joi.string()
    .required()
    .description('MongoDB connection string')
}).unknown();

const { value: env, error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Configuração inválida: ${error.message}`);
}

export default env as EnvVars;