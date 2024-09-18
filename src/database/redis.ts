import Redis from 'ioredis';
import { config } from '../config';

console.log(`Trying to connect to Redis at ${config.REDIS_HOST}:${config.REDIS_PORT}`);

/**
 * Configuración de Redis
 * 
 * Parámetros:
 * - host: Dirección IP o nombre de host donde se está ejecutando Redis.
 * - port: Puerto donde Redis está escuchando (normalmente 6379).
 * - connectTimeout: Tiempo máximo de espera en milisegundos para establecer la conexión antes de fallar. 
 * - retryStrategy: Estrategia de reintento en caso de fallo de conexión. Aumenta el tiempo entre reintentos basado en el número de intentos. 
 *   En este caso, comenzará con 100ms y se incrementará hasta un máximo de 2000ms por intento.
 * - maxRetriesPerRequest: Número máximo de reintentos por solicitud antes de fallar. 'null' permite un número ilimitado de reintentos.
 */
const redis = new Redis({
  host: 'redis',  
  port: config.REDIS_PORT, 
  connectTimeout: config.REDIS_TIMEOUT || 10000,  
  retryStrategy(times) {
   
    return Math.min(times * 100, 2000);  
  },
  maxRetriesPerRequest: null,  
});

// Monitor de eventos de Redis para mejor diagnóstico y control
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
