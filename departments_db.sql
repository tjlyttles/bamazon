DROP DATABASE IF EXISTS departments_db;

CREATE DATABASE departments_db;

USE departments_db;

CREATE TABLE deparments (

    department_id INT(10) NOT NULL AUTO_INCREMENT,

    department_name VARCHAR(60) NOT NULL,

    over_head_costs DECIMAL(20,2) NULL,

    product_sales DECIMAL(20,2) NULL,

);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Weapon', 6800);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Clothing', 2500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Armor', 700);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Food/Snack', 210);

SELECT SUM(over_head_costs - product_sales) AS total_profit FROM departments
GROUP BY department_name;