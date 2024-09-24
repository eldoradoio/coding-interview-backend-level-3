import { Server } from "@hapi/hapi";
import * as fs from 'fs';
import * as path from 'path';

export const defineRoutes = (server: Server) => {
    const modulesPath = path.join(__dirname, 'modules');
    fs.readdirSync(modulesPath).forEach(file => {
        const modulePath = path.join(modulesPath, file);
        const module = require(modulePath);
        if (module.initializeModule) {
            module.initializeModule(server);
        }
    });
};