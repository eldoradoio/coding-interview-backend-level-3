import * as dotenv from 'dotenv';
import * as joi from 'joi';
import { Dbconfig } from './interfaces/db.interfaces';


dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : process.env.NODE_ENV === 'production' ? '.env.prod' : '.env'
});

const envSchema = joi.object({
    NODE_ENV: joi.string().valid('development', 'test', 'production').default('development'),
    PORT_MS: joi.string().required(),
    DB_TYPE: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
}).unknown(); 

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
interface AppConfig {
    env: string;
    portMs: string;
    db: Dbconfig;
  }
export const config: AppConfig = {
    env: envVars.NODE_ENV,
    portMs: envVars.PORT_MS,
    db: {
        type: envVars.DB_TYPE ,
        host: envVars.DB_HOST,
        port: envVars.DB_PORT,
        username: envVars.DB_USER,
        password: envVars.DB_PASSWORD,
        database: envVars.DB_NAME,
    }
};
