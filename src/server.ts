import Hapi from '@hapi/hapi'
import { defineRoutes } from './routes'
import { AppDataSource } from './config/database/ormconfig'
import { config } from './config/config'

const getServer = () => {
    const server = Hapi.server({
        host: 'localhost',
        port: config.portMs,
    })

    defineRoutes(server)

    return server
}

export const initializeServer = async (start=false) => {
    if(!AppDataSource.isInitialized){
        await AppDataSource.initialize()
    }
    const server = getServer()
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