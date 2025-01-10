
# Prueba Dorado.io  

## Descripción

Resolución de la prueba para **dorado.io**.
Se propone una solución utilizando el framework **Hapi.js** y **Sequelize.js** como ORM.
La base de datos remota incluye una única tabla, **item**, con los campos:

-  `id` (identificador único)
-  `name` (nombre del ítem)
-  `price` (precio del ítem)
---

## Construcción y ejecución de la imagen en Docker

### Construir la imagen

```bash
docker  build  -t  dorado-test  -f  {PATH}/coding-interview-backend-level-3/.devcontainer/Dockerfile  {PATH}/coding-interview-backend-level-3
```
## Ejecutar la imagen

```bash
docker  run  -p  3000:3000  dorado-test
```

Una vez ejecutada, el proyecto estará disponible en http://localhost:3000.

## Instalación de dependencias

### Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm  install
```

## Inicialización del proyecto

### Inicia el proyecto en modo desarrollo con:

```bash
npm  run  start:dev
```

## Pruebas E2E

### Ejecución de las pruebas

Para correr las pruebas end-to-end:

```bash
npm  run  test
```
 
 **- Notas sobre las pruebas**

 * Se creó un segundo archivo de pruebas E2E llamado crud.test.ts, que  
   obtiene los mismos resultados esperados que index.test.ts, pero      
   maneja de forma distinta las funciones de los valores expect.

 * index.test.ts está excluido de la ejecución por la propiedad
   testPathIgnorePatterns en el archivo de configuración jest.unit.json.
   Si deseas incluirlo, elimina esta propiedad del archivo mencionado.

  
  

## Credenciales de la Base de Datos (MySQL)

### Estas son las credenciales configuradas para la conexión:

```bash
# .env
DATABASE=bu4wembnuycqg4czxufz
DB_USER=u3jxiph0g0shxvdn
DB_PASSWORD=uHMvvanCtFUlO9OylMtG
DB_HOST=bu4wembnuycqg4czxufz-mysql.services.clever-cloud.com
```


## Resultados de pruebas e2e

![Imgur](https://i.imgur.com/OssEsDi.png)