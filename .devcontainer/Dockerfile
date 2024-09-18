FROM node:20

# Actualización de repositorios e instalación de herramientas
# Se añaden psql, redis-tools y mariadb-client para verificar la conexión con contenedores de base de datos
RUN apt update && apt install -y less man-db sudo postgresql-client redis-tools mariadb-client

ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Directorio de trabajo
WORKDIR /workspace

# Copia de los archivos package.json y package-lock.json
COPY package*.json ./

# Instalación de dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Mantiene el contenedor activo
CMD ["tail", "-f", "/dev/null"]
