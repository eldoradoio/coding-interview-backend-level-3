
import { Sequelize } from 'sequelize';
import 'dotenv/config';
const DATABASE = process.env.DATABASE || 'bu4wembnuycqg4czxufz';
const DB_USER = process.env.DB_USER || 'u3jxiph0g0shxvdn';
const DB_PASSWORD = process.env.DB_PASSWORD || 'bu4wembnuycqg4czxufz';
const DB_HOST = process.env.DB_HOST || 'bu4wembnuycqg4czxufz-mysql.services.clever-cloud.com';

export const db = new Sequelize(DATABASE, DB_USER, DB_PASSWORD,{
    host: DB_HOST,
    dialect: 'mysql',
    port: 3306
});