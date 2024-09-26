import * as filesServer from 'fs';
import * as fs from 'fs';
import * as path from 'path';
import Hapi, { Server } from '@hapi/hapi'
import HapiSwagger from 'hapi-swagger';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';

import { requestLogger } from './pipelines';
import { configuration, Configuration} from './config';

const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(filesServer.readFileSync(packageJsonPath, 'utf8'));

/**
 * Retrieves the modules to be loaded under the folder 'modules'.
 * @returns {Promise<any[]>} A promise that resolves to an array of modules.
 */
const getModules = async (): Promise<any[]> => {
    const modulesPath: string = path.join(__dirname, 'modules');
    return fs.readdirSync(modulesPath).map(file => {
        const modulePath = path.join(modulesPath, file);
        const mod = require(modulePath)
        
        return mod;
    });
}

/**
 * Loads the modules into the Hapi server.
 * @param {Server} server - The Hapi server instance.
 * @param {Configuration} configuration - The configuration object.
 * @returns {Promise<void>} A promise that resolves when the modules are loaded.
 */
const loadModules = async (server: Server, configuration: Configuration): Promise<void> => {
    const modules = await getModules();
    modules.forEach(async module => {
        if (module.initializeModule) {
            await module.initializeModule(server, configuration);
        }
    });
}

/**
 * Unloads the modules from the Hapi server.
 * @returns {Promise<void>} A promise that resolves when the modules are unloaded.
 */
const unloadModules = async (): Promise<void> => {
    const modules = await getModules();
    modules.forEach(async module => {
        if (module.stopModule) {
            await module.stopModule();
        }
    });
}

/**
 * Registers Swagger documentation plugin to the Hapi server.
 * @param {Server} server - The Hapi server instance.
 * @returns {Promise<void>} A promise that resolves when the Swagger plugin is registered.
 */
const registerSwagger = async (server: Server): Promise<void> => {
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
}

/**
 * Creates and configures the Hapi server instance.
 * @returns {Promise<Server>} A promise that resolves to the configured Hapi server instance.
 */
const getServer = async (): Promise<Server> => {
    const server = Hapi.server({
        host: '0.0.0.0',
        port: configuration.port
    });

    registerSwagger(server);
    await loadModules(server, configuration);
    requestLogger(server);

    server.ext('onPreStop', async () => {
        console.log('Server is stopping, unloading modules...');
        await unloadModules();
    });

    return server;
}

/**
 * Initializes the Hapi server without starting it.
 * @returns {Promise<Server>} A promise that resolves to the initialized Hapi server instance.
 */
export const initializeServer = async (): Promise<Server> => {
    const server = await getServer();
    await server.initialize();
    
    return server;
}

/**
 * Starts the Hapi server.
 * @returns {Promise<Server>} A promise that resolves to the started Hapi server instance.
 */
export const startServer = async (): Promise<Server> => {
    const server = await getServer();
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    
    return server;
};