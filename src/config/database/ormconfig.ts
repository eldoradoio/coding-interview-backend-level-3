import { DataSource } from 'typeorm';
import { Item } from '../../entities/item.entities';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '041086',
    database: 'doradodb',
    synchronize: false, 
    logging: true,
    entities: [Item],
    migrations: [__dirname + '/migrations/*.ts'],
    subscribers: [],
});
