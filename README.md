<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Changelog - Implementación de dos servidores</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    h1 {
      border-bottom: 2px solid #2980b9;
      padding-bottom: 10px;
    }
    code {
      background-color: #000;
      color: #00ff00;
      padding: 5px;
      border-radius: 5px;
    }
    pre {
      background-color: #000;
      color: #00ff00;
      padding: 10px;
      border-left: 5px solid #00ff00;
      overflow-x: auto;
    }
    ul {
      margin: 20px;
    }
  </style>
</head>
<body>
  <h1>Changelog</h1>

  <h2>Actualización - Implementación de dos servidores de base de datos (17 de Septiembre de 2024)</h2>

  <h3>Contexto</h3>
  <p>En esta actualización, se implementaron cambios significativos en la lógica de la aplicación para distribuir la información de los items en dos servidores de bases de datos diferentes, cumpliendo con los siguientes requisitos:</p>
  <ul>
    <li>Los items con IDs pares se almacenan en el <strong>Servidor de Base de Datos A</strong>.</li>
    <li>Los items con IDs impares se almacenan en el <strong>Servidor de Base de Datos B</strong>.</li>
    <li>Las operaciones de <code>Get Item</code> y <code>Get All</code> deben funcionar de forma transparente para el usuario, como si la aplicación estuviese conectada a una sola base de datos.</li>
  </ul>

  <h3>Implementación</h3>

  <h4>Base de Datos</h4>
  <ul>
    <li><strong>Servidor A</strong>: PostgreSQL se utiliza como la base de datos en el <strong>Servidor A</strong>.</li>
    <li><strong>Servidor B</strong>: MariaDB se utiliza en el <strong>Servidor B</strong>, cumpliendo con la condición de servidores "físicamente distintos" y trabajando con diferentes tipos de bases de datos.</li>
    <li><strong>Redis</strong>: Redis se utiliza como un sistema de almacenamiento en memoria para gestionar estados temporales del sistema, como el contador de IDs. Esto permite realizar operaciones rápidas y eficientes.</li>
  </ul>

  <h4>Cambios en el Código</h4>
  <ul>
    <li>Se crearon dos conexiones distintas utilizando <strong>TypeORM</strong>, una para cada base de datos, configuradas en el archivo <code>ormconfig.ts</code>.</li>
    <li>La lógica de almacenamiento de items fue modificada para insertar items en la base de datos correspondiente (A o B) dependiendo de si el ID es par o impar.</li>
    <li>La operación <code>Get All</code> combina los items obtenidos de ambas bases de datos en un solo resultado, manteniendo la transparencia hacia el usuario.</li>
  </ul>

  <h4>Mejoras Técnicas</h4>
  <p>Se utilizó la función <code>Promise.all()</code> para realizar consultas a ambas bases de datos simultáneamente, mejorando la eficiencia.</p>

  <h3>Arquitectura del Código</h3>
  <ul>
    <li><strong>Rutas</strong>: Se definieron claramente las rutas existentes y hacia qué controladores apuntan.</li>
    <li><strong>Controllers</strong>: Reciben las peticiones y manejan las respuestas, delegando la lógica de negocio a los servicios.</li>
    <li><strong>Services</strong>: Residen toda la lógica de negocio y las interacciones con la base de datos, manteniendo el controlador enfocado en las respuestas HTTP.</li>
  </ul>

  <h3>DTOs y Validaciones</h3>
  <p>Se implementaron <strong>DTOs (Data Transfer Objects)</strong> utilizando Joi para validar la entrada de datos. Esto asegura que los datos recibidos estén correctos antes de ser procesados.</p>
  <pre><code>const CreateItemDTO = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'El campo "name" es requerido',
  }),
  price: Joi.number().min(0).required().messages({
    'number.min': 'El campo "price" no puede ser negativo',
    'any.required': 'El campo "price" es requerido',
  }),
});
  </code></pre>

  <h2>Instalación y Ejecución</h2>

  <h3>Requisitos:</h3>
  <ul>
    <li>Docker y Docker Compose</li>
    <li>Node.js</li>
    <li>PostgreSQL</li>
  </ul>

  <h3>Pasos para ejecutar el proyecto:</h3>
  <ol>
    <li>Clonar el repositorio:
      <pre><code>git clone git@github.com:aragornz325/coding-interview-backend-level-3.git</code></pre>
    </li>
    <li>Configurar el entorno:
      <p>Crear un archivo .env con las variables necesarias para conectar la base de datos.</p>
      <pre><code>DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=mydatabase</code></pre>
    </li>
    <li>Instalar las dependencias con npm:
      <pre><code>npm install</code></pre>
    </li>
    <li>Iniciar los contenedores de Docker:
      <pre><code>docker-compose up --build</code></pre>
    </li>
    <li>Ejecutar los tests:
      <pre><code>npm run test</code></pre>
    </li>
  </ol>

  <h2>Enfoque Simple pero Eficiente</h2>
  <p>Opté por no usar Nest.js, ya que quería un enfoque minimalista y directo. Hapi.js me permitió construir una API sólida con TypeScript sin agregar sobrecarga innecesaria.</p>
</body>
</html>
