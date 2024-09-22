# Proyecto Hapi.js con Docker y PostgreSQL

Este proyecto es una API RESTful construida con Hapi.js, que utiliza PostgreSQL como base de datos y pgAdmin como herramienta de administración de la base de datos. La aplicación está diseñada para funcionar en contenedores Docker para simplificar la configuración y el despliegue.

## **Índice**
- [Requisitos previos](#requisitos-previos)
- [Configuración del entorno](#configuración-del-entorno)
- [Iniciar la aplicación con Docker](#iniciar-la-aplicación-con-docker)
- [Estructura de la API](#estructura-de-la-api)
- [Probar la API](#probar-la-api)
- [Acceder a la base de datos con pgAdmin](#acceder-a-la-base-de-datos-con-pgadmin)
- [Apagar la aplicación](#apagar-la-aplicación)

## **Requisitos previos**

- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/install/) instalados en tu máquina.

## **Configuración del entorno**

Asegúrate de tener un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```dotenv
NODE_ENV=development
PORT_MS=3000
DB_TYPE=postgres
DB_HOST=db
DB_PORT=5432
DB_USER=dorado
DB_PASSWORD=doradoo
DB_NAME=doradodb
```
Nota: La variable DB_HOST está configurada como db para que la aplicación se comunique correctamente con el contenedor de PostgreSQL.


# Iniciar la aplicación con Docker

## Clona el repositorio y navega a la carpeta del proyecto:
```
git clone https://github.com/tu-usuario/nombre-proyecto.git
cd nombre-proyecto

```

## Levanta la aplicación utilizando Docker Compose:
```
docker-compose up --build

```

Esto iniciará los siguientes contenedores:

* **api**: La API desarrollada en Hapi.js escuchando en [http://localhost:3000](http://localhost:3000).
* **db**: La base de datos PostgreSQL.
* **pgadmin**: Herramienta de administración de base de datos accesible en [http://localhost:5050](http://localhost:5050).

**Estructura de la API**
------------------------

La API proporciona los siguientes endpoints:

| Método  | Ruta         | Descripción                             |
|---------|--------------|-----------------------------------------|
| GET     | /ping         | Verifica que la API esté funcionando    |
| GET     | /items        | Obtiene la lista de items               |
| GET     | /items/{id}   | Obtiene un item por ID                  |
| POST    | /items        | Crea un nuevo item                      |
| PUT     | /items/{id}   | Actualiza un item existente por ID      |
| DELETE  | /items/{id}   | Elimina un item por ID                  |



## Probar la API
----------------

Una vez que la aplicación esté en funcionamiento, puedes probarla de las siguientes maneras:

* **Desde el navegador o herramientas como Postman / Insomnia**:
    * Prueba el endpoint de salud (`/ping`) visitando: [http://localhost:3000/ping](http://localhost:3000/ping)
    
* **Pruebas manuales con `curl`**:
    ```bash
    curl http://localhost:3000/ping
    ```
## Acceder a la base de datos con pgAdmin
------------------------------------------

pgAdmin estará disponible en [http://localhost:5050](http://localhost:5050). Las credenciales por defecto son:

* **Correo electrónico**: admin@admin.com
* **Contraseña**: admin

Para configurar la conexión a PostgreSQL dentro de pgAdmin:

1. Haz clic derecho en "Servers" y selecciona `Create -> Server`.
2. Configura los siguientes datos:
   * **Name**: Postgres
   * **Host**: db
   * **Port**: 5432
   * **Username**: dorado
   * **Password**: doradoo

## Apagar la aplicación
------------------------

Para detener y eliminar los contenedores, ejecuta:
```
docker-compose down

```
Esto desmontará todos los contenedores y liberará los recursos.