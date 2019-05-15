DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT(10) NOT NULL AUTO_INCREMENT,
  
  product_name VARCHAR(100) NOT NULL,
  
  department_name VARCHAR(60) NOT NULL,
  
  price DECIMAL(10,2) NULL,
  
  stock_quantity INT(10) NULL,
  
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Rare Mystical Wizard Gemstone of Ember Storms', 'misc', .75, 1600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Leather Chest', 'clothing', 47.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Chainmail', 'armor', 69.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Round Shield', 'weapon', 35.49, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Health Potion', 'food/snack', 8.49, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Leather Boots', 'clothing', 13.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Excalibur', 'weapon', 3999.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Longbow', 'weapon', 36.39, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Steel-tipped Arrows x 10', 'weapon', 4.19, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Socks', 'clothing', 3.00, 35);
