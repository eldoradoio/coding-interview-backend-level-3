-- init_b.sql para MariaDB

-- Crear la tabla `item` con los campos `id`, `name` y `price`
CREATE TABLE item (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Ajustar el valor inicial del AUTO_INCREMENT para que comience en 1 (impar)
ALTER TABLE item AUTO_INCREMENT = 1;

-- No se populan datos en la tabla `item` porque se hará en el código de la aplicación.
