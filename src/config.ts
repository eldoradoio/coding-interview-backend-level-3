import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface Config {
    host: string;
    port: number;
}

const config: Config = {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT || '3000', 10),
};

export default config;