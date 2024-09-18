-- Crear la tabla `item` con los campos `id`, `name` y `price`

-- init_a.sql

CREATE SEQUENCE item_id_seq
    START WITH 2  -- Comienza desde el 2 para obtener solo pares
    INCREMENT BY 2;  -- Incrementa de 2 en 2 para asegurarme que todos los IDs sean pares

CREATE TABLE item (
    id INT DEFAULT nextval('item_id_seq') PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10, 2)
);
-- no se populan datos en la tabla `item` porque se hará en el código de la aplicación