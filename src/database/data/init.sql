-- Crear la tabla `item` con los campos `id`, `name` y `price`
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- no se populan datos en la tabla `items` porque se hará en el código de la aplicación