import * as dotenv from 'dotenv';
import * as joi from 'joi';
import { Dbconfig } from './interfaces/db.interfaces';


dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : process.env.NODE_ENV === 'production' ? '.env.prod' : '.env'
});

const envSchema = joi.object({
    NODE_ENV: joi.string().valid('development', 'test', 'production').default('development'),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),
    TEST_DB_HOST: joi.string().optional(),
    TEST_DB_PORT: joi.number().optional(),
    TEST_DB_USER: joi.string().optional(),
    TEST_DB_PASSWORD: joi.string().optional(),
    TEST_DB_NAME: joi.string().optional().default(':memory:')
}).unknown(); 

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
interface AppConfig {
    env: string;
    db: Dbconfig;
  }
export const config: AppConfig = {
    env: envVars.NODE_ENV,
    db: {
        type: envVars.NODE_ENV === 'test' && envVars.TEST_DB_NAME === ':memory:' ? 'sqlite' : 'postgres',
        host: envVars.NODE_ENV === 'test' && envVars.TEST_DB_NAME === ':memory:' ? undefined : envVars.TEST_DB_HOST || envVars.DB_HOST,
        port: envVars.NODE_ENV === 'test' && envVars.TEST_DB_NAME === ':memory:' ? undefined : envVars.TEST_DB_PORT || envVars.DB_PORT,
        username: envVars.NODE_ENV === 'test' && envVars.TEST_DB_NAME === ':memory:' ? undefined : envVars.TEST_DB_USER || envVars.DB_USER,
        password: envVars.NODE_ENV === 'test' && envVars.TEST_DB_NAME === ':memory:' ? undefined : envVars.TEST_DB_PASSWORD || envVars.DB_PASSWORD,
        database: envVars.NODE_ENV === 'test' ? envVars.TEST_DB_NAME : envVars.DB_NAME,
    }
};
