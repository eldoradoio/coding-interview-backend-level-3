# README

## Explanation

- I have created a simple REST API for a blog application using Node.js, Hapi.js, and MongoDB.
- The API has the following endpoints:
  - GET /items
  - POST /items
  - GET /items/{id}
  - PUT /items/{id}
  - DELETE /items/{id}

- The API has Swagger documentation which can be accessed [here](http://localhost:3000/documentation) once the project is up.

- The API has the feature to switch between memory and MongoDB repositories. The repository type can be set in the .env file.

- The API has logging created by my own logger module. Logs only appear in the console for now.

- The API has some basic tests written using Jest.

- The API has a Dockerfile and a docker-compose file to run the application in a Docker container.

- The API has some basic error handling for all the endpoints.

- The API has a basic validation pipeline for all the endpoints using Joi.

## Installation

1. Clone the repository

    ```bash
        git clone
    ```

2. Install the dependencies

    ```bash
        npm install
    ```

3. Create a .env file and add the following

    ```bash
        PORT=3000
        DB_CONNECTION_STRING={your mongodb uri}
        REPOSITORY_TYPE={memory | mongodb}
    ```

4. Run the server

    ```bash
        npm start
    ```

5. Run the tests

    ```bash
        npm test
    ```
