CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

INSERT INTO items (name, price) VALUES
('Item 1', 10.99),
('Item 2', 20.50),
('Item 3', 15.00),
('Item 4', 5.75),
('Item 5', 30.00),
('Item 6', 8.25),
('Item 7', 45.99),
('Item 8', 22.50),
('Item 9', 17.30),
('Item 10', 12.99);
