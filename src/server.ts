import Hapi from '@hapi/hapi';
import { defineRoutes } from './routes';

/**
 * Crea y configura una nueva instancia de servidor Hapi.
 *
 * @returns Una instancia configurada del servidor Hapi.
 */
export const getServer = (): Hapi.Server => {
  const server = Hapi.server({
    host: 'localhost', // Configura el host del servidor.
    port: 3000, // Configura el puerto en el que el servidor escuchará.
  });

  defineRoutes(server); // Define las rutas del servidor utilizando la función `defineRoutes`.

  return server; // Devuelve la instancia del servidor configurado.
};

/**
 * Inicializa el servidor Hapi.
 *
 * @returns Una promesa que resuelve con la instancia del servidor una vez que ha sido inicializado.
 * @throws Error si ocurre un problema durante la inicialización del servidor.
 */
export const initializeServer = async (): Promise<Hapi.Server> => {
  const server = getServer(); // Obtiene una nueva instancia del servidor configurado.
  try {
    await server.initialize(); // Inicializa el servidor.
    return server; // Devuelve el servidor una vez inicializado.
  } catch (error) {
    console.error('Error during server initialization:', error); // Registra cualquier error que ocurra durante la inicialización.
    throw error; // Vuelve a lanzar el error para manejarlo más adelante si es necesario.
  }
};

/**
 * Inicia el servidor Hapi.
 *
 * @returns Una promesa que resuelve con la instancia del servidor una vez que ha sido iniciado.
 * @throws Error si ocurre un problema durante el inicio del servidor.
 */
export const startServer = async (): Promise<Hapi.Server> => {
  const server = getServer(); // Obtiene una nueva instancia del servidor configurado.
  try {
    await server.start(); // Inicia el servidor.
    console.log(`Server running on ${server.info.uri}`); // Registra la URI en la que el servidor está corriendo.
    return server; // Devuelve el servidor una vez iniciado.
  } catch (error) {
    console.error('Error during server startup:', error); // Registra cualquier error que ocurra durante el inicio del servidor.
    throw error; // Vuelve a lanzar el error para que pueda ser manejado en otro lugar si es necesario.
  }
};
