import * as dotenv from 'dotenv';
import * as Joi from 'joi';

dotenv.config();

/**
 * Esquema de validación de las variables de entorno
 */
const envSchema = Joi.object({
  DB_HOST_A: Joi.string().required(),
  DB_PORT_A: Joi.number().port().required(),
  DB_USER_A: Joi.string().required(),
  DB_PASSWORD_A: Joi.string().required(),
  DB_NAME_A: Joi.string().required(),

  DB_HOST_B: Joi.string().required(),
  DB_PORT_B: Joi.number().port().required(),
  DB_USER_B: Joi.string().required(),
  DB_PASSWORD_B: Joi.string().required(),
  DB_NAME_B: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().port().required(),
  REDIS_TIMEOUT: Joi.number().required()
}).unknown(true); 

/**
 * Validar las variables de entorno.
 */
const { error, value: envVars } = envSchema.validate(process.env, { abortEarly: false });

if (error) {
  throw new Error(`Error de validación en las variables de entorno: ${error.message}`);
}

/**
 * Clase que exporta las variables de entorno de la aplicación para las dos bases de datos.
 * @class
 */
class Config {
  //db a
  public readonly DB_HOST_A: string;
  public readonly DB_PORT_A: number;
  public readonly DB_USER_A: string;
  public readonly DB_PASSWORD_A: string;
  public readonly DB_NAME_A: string;
  //db b
  public readonly DB_HOST_B: string;
  public readonly DB_PORT_B: number;
  public readonly DB_USER_B: string;
  public readonly DB_PASSWORD_B: string;
  public readonly DB_NAME_B: string;

  //redis
  public readonly REDIS_HOST: string;
  public readonly REDIS_PORT: number;
  public readonly REDIS_TIMEOUT: number;

  constructor() {
    // Asignación para la base de datos A
    this.DB_HOST_A = envVars.DB_HOST_A;
    this.DB_PORT_A = envVars.DB_PORT_A;
    this.DB_USER_A = envVars.DB_USER_A;
    this.DB_PASSWORD_A = envVars.DB_PASSWORD_A;
    this.DB_NAME_A = envVars.DB_NAME_A;

    // Asignación para la base de datos B
    this.DB_HOST_B = envVars.DB_HOST_B;
    this.DB_PORT_B = envVars.DB_PORT_B;
    this.DB_USER_B = envVars.DB_USER_B;
    this.DB_PASSWORD_B = envVars.DB_PASSWORD_B;
    this.DB_NAME_B = envVars.DB_NAME_B;

    // Asignación para Redis
    this.REDIS_HOST = envVars.REDIS_HOST;
    this.REDIS_PORT = envVars.REDIS_PORT;
    this.REDIS_TIMEOUT = envVars.REDIS_TIMEOUT;
  }
}

export const config = new Config();
