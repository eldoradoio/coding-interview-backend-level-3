import * as fs from 'fs';
import * as path from 'path';
import Hapi, { Server } from '@hapi/hapi'
import HapiSwagger from 'hapi-swagger';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import { requestLogger } from './pipelines';
import { configuration, Configuration} from './config';

const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const loadModules = (server: Server, configuration: Configuration) => {
    const modulesPath: string = path.join(__dirname, 'modules');
    fs.readdirSync(modulesPath).forEach(file => {
        const modulePath = path.join(modulesPath, file);
        const module = require(modulePath);
        if (module.initializeModule) {
            module.initializeModule(server, configuration);
        }
    });
}

const getServer = async () => {
    const server = Hapi.server({
        host: configuration.host,
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

    server.ext('onPreHandler', requestLogger);

    loadModules(server, configuration);

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