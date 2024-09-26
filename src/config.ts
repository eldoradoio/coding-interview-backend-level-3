import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export interface Configuration {
    port: number;
    dbConnectionString: string;
    repositoryType?: 'memory' | 'mongodb';
}

export const configuration: Configuration = {
    port: parseInt(process.env.PORT || '3000', 10),
    dbConnectionString: process.env.DB_CONNECTION_STRING || '',
    repositoryType: process.env.REPOSITORY_TYPE as Configuration['repositoryType']
};