# Coding Interview Backend Level 3 - REST API

## Descripción

Este proyecto es una API RESTful desarrollada para realizar operaciones CRUD sobre una entidad llamada `Item`. **Me enfoque en mantener una estructura simple y funcional** que se alinee con las necesidades de los tests E2E proporcionados, evitando el uso de frameworks más pesados como Nest.js, que no se justificaba para este nivel de complejidad.

## Tecnologías Utilizadas

- **TypeScript**: Utilice TypeScript para asegurar un código tipado, robusto y escalable.
- **Hapi.js**: Opte por Hapi.js, un framework ligero y flexible para la creación de servidores, que ofrece una excelente integración con TypeScript.
- **TypeORM**: Para manejar las operaciones de base de datos, use TypeORM como mi ORM, lo que me permitió mapear entidades a tablas y manejar las relaciones de forma sencilla.
- **PostgreSQL**: Base de datos relacional que proporciona estabilidad y fiabilidad para las operaciones CRUD.
- **Joi**: Para validar las entradas de datos, use Joi, una biblioteca poderosa que me permitio implementar **DTOs** (Data Transfer Objects) para mantener la seguridad de las entradas y salidas.
- **Docker**: Todo el entorno se maneja con Docker para facilitar la replicación y el despliegue. Utilice contenedores para la base de datos PostgreSQL y el servidor de la API.
- **Jest**: Para realizar los tests E2E, me apoye en Jest, validando que todos los endpoints cumplan con las expectativas proporcionadas por el enunciado.

## Estructura del Proyecto

El proyecto sigue una **arquitectura de capas**, que divide las responsabilidades y facilita la escalabilidad:

```bash
src/
├── controllers/
│   └── items.controller.ts      # Controla las operaciones relacionadas a los Items
│   └── users.controller.ts      # Controla las operaciones relacionadas a los Usuarios (si se añade)
├── services/
│   └── items.services.ts        # Contiene la lógica de negocio y conexión con la base de datos para Items
│   └── users.services.ts        # Contiene la lógica de negocio y conexión con la base de datos para Usuarios (si se añade)
├── routes/
│   ├── items.routes.ts          # Define las rutas para los endpoints de Items  
│   └── index.ts                 # Importa y registra todas las rutas
├── database/
│   ├── data/                    # Contiene los scripts SQL para la inicialización
│   └── entities/                # Definiciones de las entidades de la base de datos
├── server.ts                    # Configura y arranca el servidor Hapi
└── config.ts 
```

### Arquitectura Basada en Capas

1. **Routes**: Define los endpoints expuestos de la API, estableciendo qué rutas existen y hacia qué controladores apuntan.
2. **Controllers**: Son responsables de recibir las peticiones y manejar las respuestas, delegando la lógica de negocio a los servicios.
3. **Services**: Aquí reside toda la lógica de negocio y las interacciones con la base de datos. Se asegura la separación de responsabilidades, manteniendo el controlador limpio y enfocado en las respuestas HTTP.

### DTOs y Validaciones

implemente **DTOs (Data Transfer Objects)** utilizando Joi para validar la entrada de datos. Esto asegura que los datos recibidos estén correctos antes de ser procesados por los servicios.

```typescript
const CreateItemDTO = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Field "name" is required',
  }),
  price: Joi.number().min(0).required().messages({
    'number.min': 'Field "price" cannot be negative',
    'any.required': 'Field "price" is required',
  }),
});
```


### Instalación y Ejecución

#### Requisitos:
- Docker y Docker Compose
- Node.js
- PostgreSQL

#### Pasos para ejecutar el proyecto:
1. Clonar el repositorio:
bash
```bash
git clone git@github.com:aragornz325/coding-interview-backend-level-3.git
```

2. Configurar el entorno: Crear un archivo .env basado en las variables de entorno necesarias para conectar la base de datos.
    Esto no es estrictamente necesario dado que con la configuracion actual toma las variables del docker-compose

```bash
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=mydatabase
```

3. Instalar las dependencias con npm:

```bash
npm install
```

4. Iniciar los contenedores de Docker:

```bash
docker-compose up --build
```

5. Ejecutar los tests:

```bash
npm run test
```

### Enfoque Simple pero Eficiente
Opte por no usar Nest.js porque queria un enfoque minimalista y directo, adecuado para las necesidades del test. Hapi.js me permitió construir una API sólida con TypeScript sin agregar una sobrecarga innecesaria.
