import * as dotenv from 'dotenv';

dotenv.config();

class Config {
  public readonly DB_HOST: string;
  public readonly DB_PORT: number;
  public readonly DB_USER: string;
  public readonly DB_PASSWORD: string;
  public readonly DB_NAME: string;

  constructor() {
    this.DB_HOST = process.env.DB_HOST!; 
    this.DB_PORT = parseInt(process.env.DB_PORT! , 10);
    this.DB_USER = process.env.DB_USER!;
    this.DB_PASSWORD = process.env.DB_PASSWORD!;
    this.DB_NAME = process.env.DB_NAME!;
  }
}


export const config = new Config();
