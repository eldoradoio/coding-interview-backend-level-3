import * as dotenv from 'dotenv';

dotenv.config();


/**
 * Función para validar que una variable de entorno esté presente.
 * @param {string} name - Nombre de la variable de entorno.
 * @throws {Error} Si la variable de entorno no está definida.
 */
function validateEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`La variable de entorno ${name} es obligatoria y no está definida.`);
  }
  return value;
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
    // Validación y asignación para la base de datos A
    this.DB_HOST_A = validateEnvVar('DB_HOST_A');
    this.DB_PORT_A = parseInt(validateEnvVar('DB_PORT_A'), 10);
    this.DB_USER_A = validateEnvVar('DB_USER_A');
    this.DB_PASSWORD_A = validateEnvVar('DB_PASSWORD_A');
    this.DB_NAME_A = validateEnvVar('DB_NAME_A');

    // Validación y asignación para la base de datos B
    this.DB_HOST_B = validateEnvVar('DB_HOST_B');
    this.DB_PORT_B = parseInt(validateEnvVar('DB_PORT_B'), 10);
    this.DB_USER_B = validateEnvVar('DB_USER_B');
    this.DB_PASSWORD_B = validateEnvVar('DB_PASSWORD_B');
    this.DB_NAME_B = validateEnvVar('DB_NAME_B');

    // Validación y asignación para redis
    this.REDIS_HOST = validateEnvVar('REDIS_HOST');  // IP o nombre de host del servicio Redis en Docker
    this.REDIS_PORT =  parseInt(validateEnvVar('REDIS_PORT'), 10)  // Puerto de Redis
    this.REDIS_TIMEOUT = parseInt(validateEnvVar('REDIS_TIMEOUT'), 10)  //
  }
}

export const config = new Config();
