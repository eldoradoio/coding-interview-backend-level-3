import Hapi, { Server } from '@hapi/hapi'
import * as fs from 'fs';
import * as path from 'path';

const loadModules = (server: Server) => {
    const modulesPath: string = path.join(__dirname, 'modules');
    fs.readdirSync(modulesPath).forEach(file => {
        const modulePath = path.join(modulesPath, file);
        const module = require(modulePath);
        if (module.initializeModule) {
            module.initializeModule(server);
        }
    });
}

const getServer = () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 3000,
    })

    loadModules(server);

    return server
}

export const initializeServer = async () => {
    const server = getServer()
    await server.initialize()
    
    return server
}

export const startServer = async () => {
    const server = getServer()
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    
    return server
};