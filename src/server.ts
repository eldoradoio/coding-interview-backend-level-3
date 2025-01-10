import Hapi from '@hapi/hapi'
import winston from 'winston';
import { defineRoutes } from './routes.ts'

const getServer = () => {
    const server = Hapi.server({
        host: process.env.HOST_API_APP || 'localhost',
        port: process.env.PORT || 3000,
    })

    defineRoutes(server)

    return server
}

export const initializeServer = async () => {
    const server = getServer()
    await server.initialize()
    return server
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
    ],
});

export const startServer = async () => {
    const server = getServer()
    server.ext('onRequest', (request, h) => {
        logger.info(`REQ: ${request.method.toUpperCase()} ${request.path}`);
        return h.continue;
    });
    server.ext('onPreResponse', (request, h) => {
        logger.info(`RES: ${request.method.toUpperCase()} ${request.path}`);
        return h.continue;
      });

    await server.start()
    console.log(`Server running on ${server.info.uri}`)
    return server
};

