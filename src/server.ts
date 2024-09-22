
import Hapi from '@hapi/hapi';
import { AppDataSource } from './config/database/ormconfig';
import { config } from './config/config';
import { AppModule } from './app.module';

const getServer = () => {
    const server = Hapi.server({
        host: '0.0.0.0',
        port: config.portMs,
        routes: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with'],
            }
        }
    })
    return server
}

export const initializeServer = async (start=false) => {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize()
    }
    const server = getServer()
    await AppModule.registerModules(server);

    if(start){
        await server.start()
        console.log(`Server running on ${server.info.uri}`)
    }else{
         await server.initialize()
    }
    return server
}

export const startServer = async () => {
    return initializeServer(true)
};

export const initializeServerForTests = async () =>{
    return initializeServer(false);
}