export interface ServerConfig {
    host: string;
    port: number;
    routes: {
      cors: {
        origin: string[];
        additionalHeaders: string[];
      };
    };
  }
  