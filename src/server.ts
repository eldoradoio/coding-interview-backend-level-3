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

const getModules = async () => {
    const modulesPath: string = path.join(__dirname, 'modules');
    return fs.readdirSync(modulesPath).map(file => {
        const modulePath = path.join(modulesPath, file);
        const module = require(modulePath)
        
        return module;
    });
}

const loadModules = async (server: Server, configuration: Configuration) => {
    const modules = await getModules();
    modules.forEach(async module => {
        if (module.initializeModule) {
            await module.initializeModule(server, configuration);
        }
    });
}

const unloadModules = async () => {
    const modules = await getModules();
    modules.forEach(async module => {
        if (module.stopModule) {
            await module.stopModule();
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

    await loadModules(server, configuration);

    server.ext('onPreStop', async () => {
        console.log('Server is stopping, unloading modules...');
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