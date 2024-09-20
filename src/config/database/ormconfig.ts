import { DataSource } from 'typeorm';
import { Item } from '../../entities/item.entities';
import { config } from '../config';

export const AppDataSource = new DataSource({
    type: process.env.NODE_ENV === 'test' ? 'sqlite' : 'postgres',
    host: process.env.NODE_ENV === 'test' ? undefined : config.db.host,
    port: process.env.NODE_ENV === 'test' ? undefined : config.db.port,
    username: process.env.NODE_ENV === 'test' ? undefined : config.db.username,
    password: process.env.NODE_ENV === 'test' ? undefined : config.db.password,
    database: process.env.NODE_ENV === 'test' ? ':memory:' : config.db.database,
    synchronize: true,
    logging: false,
    entities: [Item],
    subscribers: [],
});