import * as dotenv from 'dotenv';
const Joi = require('joi');


dotenv.config();

/**
 * Esquema de validacion de las variables de entorno.
 * @const
 * @type {Joi.ObjectSchema}
 * 
 */
const envSchema = Joi.object({
  DB_HOST: Joi.string().hostname().required().error(new Error("DB_HOST is required")),
  DB_PORT: Joi.number().required().error(new Error("DB_PORT is required")),
  DB_USER: Joi.string().required().error(new Error("DB_USER is required")),
  DB_PASSWORD: Joi.string().required().error(new Error("DB_PASSWORD is required")),
  DB_NAME: Joi.string().required().error(new Error("DB_NAME is required")),
}).unknown();


const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

/**
 * Clase que exporta las variables de entorno de la aplicacion.
 * @class
 */
class Config {
  public readonly DB_HOST: string;
  public readonly DB_PORT: number;
  public readonly DB_USER: string;
  public readonly DB_PASSWORD: string;
  public readonly DB_NAME: string;

  constructor() {
    this.DB_HOST = envVars.DB_HOST;
    this.DB_PORT = envVars.DB_PORT;
    this.DB_USER = envVars.DB_USER;
    this.DB_PASSWORD = envVars.DB_PASSWORD;
    this.DB_NAME = envVars.DB_NAME;
  }
}

export const config = new Config();