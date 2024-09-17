import { initializeServer, startServer } from './server';

/**
 * Maneja cualquier rechazo no manejado en las Promesas.
 * Si ocurre un rechazo no manejado, imprime el error y termina el proceso.
 */
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection detected:', err);
  process.exit(1); // Finaliza el proceso con código de error.
});

/**
 * Maneja cualquier excepción no capturada.
 * Si ocurre una excepción no capturada, imprime el error y termina el proceso.
 */
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception detected:', err);
  process.exit(1); // Finaliza el proceso con código de error.
});

/**
 * Función principal que inicia el servidor.
 * Intenta iniciar el servidor y maneja cualquier error durante el proceso de inicio.
 * Si el servidor se inicia correctamente, imprime un mensaje de éxito.
 */
const init = async () => {
  try {
    await startServer(); // Inicia el servidor.
    console.log('Server started successfully');
  } catch (err) {
    console.error('Error while starting the server:', err);
    process.exit(1); // Finaliza el proceso con código de error si ocurre una falla.
  }
};

// Llama a la función init para iniciar el servidor.
init();
