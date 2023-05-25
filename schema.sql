DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);
CREATE TABLE roles (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  salary DECIMAL(10, 2),
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Create employees table
CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);