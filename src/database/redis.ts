import Redis from 'ioredis';
import { config } from '../config';


console.log(`Trying to connect to Redis at ${config.REDIS_HOST}:${config.REDIS_PORT}`);



/**
 * Configuración de Redis - variables de entorno - 
 * host: IP o nombre del host de Redis (Va host)
 * port: Puerto de Redis
 * connectTimeout: Tiempo de espera para conectar a Redis
 */
const redis = new Redis({
  host: 'redis',  // IP o nombre del host de Redis (Va host)
  port: config.REDIS_PORT,  
  connectTimeout: config.REDIS_TIMEOUT || 10000,  
  retryStrategy(times) {
    return Math.min(times * 100, 2000);  
  },
  maxRetriesPerRequest: null,  
});

//monitor de eventos
redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

redis.on('ready', () => {
  console.log('Redis is ready to use');
});

redis.on('reconnecting', (time: number) => {
  console.log(`Reconnecting to Redis... Attempting again in ${time}ms`);
});

export default redis;
