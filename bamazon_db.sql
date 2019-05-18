DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT(10) NOT NULL AUTO_INCREMENT,
  
  product_name VARCHAR(100) NOT NULL,
  
  department_name VARCHAR(60) NOT NULL,
  
  price DECIMAL(10,2) NULL,
  
  stock_quantity INT(10) NULL,
  
  product_sales DECIMAL(50, 2) NOT NULL,
  
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
    department_id INT(10) NOT NULL AUTO_INCREMENT,

    department_name VARCHAR(60) NOT NULL,

    over_head_costs DECIMAL(20,2) NULL,
    
    PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Rare Mystical Wizard Gemstone of Ember Storms', 'Misc', .75, 1600, 550);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Leather Chest', 'Clothing', 47.00, 20, 800);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Chainmail', 'Armor', 69.99, 35, 1300);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Round Shield', 'Weapon', 35.49, 15, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Health Potion', 'Food/Snack', 8.49, 30, 460);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Leather Boots', 'Clothing', 13.00, 15, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Excalibur', 'Weapon', 3999.99, 1, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Longbow', 'Weapon', 36.39, 10, 3000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Steel-tipped Arrows x 10', 'Weapon', 4.19, 400, 3200);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Socks', 'Clothing', 3.00, 35, 3000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Weapon', 6800);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Clothing', 2500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Armor', 700);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Food/Snack', 210);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Misc', 300);

SELECT * FROM products;

SELECT * FROM departments;

SELECT departments.department_id, departments.department_name, departments.over_head_costs, 
SUM(products.product_sales) AS product_sales, (SUM(products.product_sales) - departments.over_head_costs) AS total_profit FROM departments
LEFT JOIN products ON products.department_name = departments.department_name 
GROUP BY departments.department_id, departments.department_name, departments.over_head_costs;

DELETE FROM products WHERE item_id = 1;

SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales FROM products 
INNER JOIN departments WHERE products.department_name = departments.department_name
GROUP BY departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales;

SELECT product_sales FROM products INNER JOIN departments WHERE products.department_name = departments.department_name ORDER BY departments.department_id;