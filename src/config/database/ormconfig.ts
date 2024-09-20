import { DataSource } from 'typeorm';
import { Item } from '../../entities/item.entities';
import { config } from '../config';

export const AppDataSource = new DataSource({
    type: config.db.type,
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    synchronize: true,
    logging: false,
    entities: [Item],
    subscribers: [],
});