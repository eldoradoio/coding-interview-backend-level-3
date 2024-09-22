# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de tu proyecto
COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
