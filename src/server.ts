import Hapi from '@hapi/hapi'
import { defineRoutes } from './routes'
import { AppDataSource } from './config/database/ormconfig'

const getServer = () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
    })

    defineRoutes(server)

    return server
}

export const initializeServer = async () => {
    await AppDataSource.initialize()
    const server = getServer()
    await server.initialize()
    return server
}

export const startServer = async () => {
    await AppDataSource.initialize()
    const server = getServer()
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    return server
};