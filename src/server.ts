
import Hapi from '@hapi/hapi';
import { AppDataSource } from './config/database/ormconfig';
import { config } from './config/config';
import { AppModule } from './app.module';

const getServer = () => {
    const server = Hapi.server(config.server)
    return server
}

export const initializeServer = async (start=false) => {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize()
    }
    const server = getServer()
    await AppModule.registerModules(server);
    server.route({
        method: '*',
        path: '/{any*}', 
        handler: (request, h) => {
          const response = h.response({
            statusCode: 404,
            error: 'Not Found',
            message: `The requested resource ${request.path} could not be found.`,
          });
          response.code(404);
          return response;
        },
    });
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