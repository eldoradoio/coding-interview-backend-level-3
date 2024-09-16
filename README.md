# Bienvenido al coding-interview-backend-level-3 (segunda parte)

## Desafío

Crear un PR en el repositorio de la prueba existente (level-3) con el siguiente cambio:

- Los Items pares se guardan en "Servidor de Base de Datos A"
- Los Items impares se guardan en "Servidor de Base de Datos B".
- Get Item / Get All, tienen que funcionar como si fuese una sola BD.

Puedes usar tipos de BD distintos o iguales. Lo importante es que se guarden en servidores "fisicamente distintos".

## Descripción

Este proyecto es una API REST que permite realizar operaciones CRUD sobre una entidad de tipo `Item`.

## Cambios realizados

- Se ha implementado una arquitectura de base de datos distribuida utilizando MongoDB.
- Se utiliza Hapi.js como framework web para la API REST.
- Se ha configurado Docker Compose para ejecutar dos instancias de MongoDB.
- Se ha implementado la lógica para distribuir los items entre las dos bases de datos según si su ID es par o impar.

## Requisitos

- Docker y Docker Compose
- Node.js (versión 14 o superior)
- npm

## Instrucciones de ejecución

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Iniciar las bases de datos MongoDB:

   ```bash
   docker-compose up -d
   ```

3. Iniciar el servidor:
   ```bash
   npm run start
   ```

El servidor estará disponible en `http://localhost:3000`.

## Pruebas e interacción con la API

Para interactuar con la API, puedes utilizar los siguientes comandos curl:

1. Verificar que el servidor está funcionando:

   ```bash
   curl http://localhost:3000/ping
   ```

2. Crear un nuevo item:

   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"id": 1, "name": "Nuevo Item", "price": 9.99}' http://localhost:3000/items
   ```

3. Obtener todos los items:

   ```bash
   curl http://localhost:3000/items
   ```

4. Obtener un item específico (reemplaza {id} con el ID deseado):

   ```bash
   curl http://localhost:3000/items/{id}
   ```

## Verificar que los datos se guardan en la base de datos correcta

### En la base de datos A

```bash
docker exec -it mongodb-a mongosh

use dbA

db.items.find()
```

### En la base de datos B

```bash
docker exec -it mongodb-b mongosh

use dbB

db.items.find()
```
