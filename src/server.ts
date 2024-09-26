import * as filesServer from 'fs';
import * as path from 'path';
import Hapi, { Server } from '@hapi/hapi'
import HapiSwagger from 'hapi-swagger';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';

import mongoose from 'mongoose';
import { requestLogger } from './pipelines';
import { configuration, Configuration} from './config';
import { healthModule, itemModule } from './modules';

const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(filesServer.readFileSync(packageJsonPath, 'utf8'));

const loadModules = async (server: Server, configuration: Configuration) => {
    await healthModule.initializeModule(server, configuration);
    await itemModule.initializeModule(server, configuration);
}

const unloadModules = async () => {
    await itemModule.stopModule();
}

const getServer = async () => {
    const server = Hapi.server({
        host: '0.0.0.0',
        port: configuration.port
    });

    const swaggerOptions = {
        info: {
            title: 'API Documentation',
            version: packageJson.version,
        },
        documentationPath: '/documentation'
    };
    
    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    
    await loadModules(server, configuration);
    requestLogger(server);
    
    server.ext('onPreStop', async () => {
        console.log('Server is stopping, unloading modules...');
        await mongoose.connection.close();
        await unloadModules();
    });

    return server
}

export const initializeServer = async () => {
    const server = await getServer()
    await server.initialize()
    
    return server
}

export const startServer = async () => {
    const server = await getServer()
    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    
    return server
};