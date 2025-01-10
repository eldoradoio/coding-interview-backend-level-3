FROM node:20

# Install basic development tools
RUN apt update && apt install -y less man-db sudo

# Ensure default `node` user has access to `sudo`
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el resto del código
COPY . .

# Instalar las dependencias
RUN npm cache clean --force && npm install

# Copiar el resto del código de la aplicación
COPY . .

# Establecer variables de entorno
ENV NODE_OPTIONS=--loader=ts-node/esm
ENV HOST_API_APP=0.0.0.0

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando por defecto para ejecutar la app
CMD ["npm", "run", "start:dev"]
