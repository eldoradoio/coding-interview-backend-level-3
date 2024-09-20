export interface Dbconfig {
    type: 'postgres' | 'sqlite',
    host: string,
    port: number, 
    username: string,
    password: string,
    database: string
}

