import { startServer } from './server';

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

const bootstrap = async () => {
  try {
    await startServer();
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

bootstrap();