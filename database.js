import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'employee_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

const viewDepartments = async () => {
  try {
    const [rows] = await connection.promise().query('SELECT * FROM departments');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing departments:', error);
  }
};

const viewRoles = async () => {
  try {
    const [rows] = await connection.promise().query('SELECT * FROM roles');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing roles:', error);
  }
};

const viewEmployees = async () => {
  try {
    const [rows] = await connection.promise().query('SELECT * FROM employees');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing employees:', error);
  }
};

const addDepartment = async (name) => {
  try {
    await connection.promise().query('INSERT INTO departments (name) VALUES (?)', [name]);
    console.log('Department added successfully!');
  } catch (error) {
    console.error('Error adding department:', error);
  }
};

const addRole = async (title, salary, departmentId) => {
  try {
    await connection.promise().query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
    console.log('Role added successfully!');
  } catch (error) {
    console.error('Error adding role:', error);
  }
};

const addEmployee = async (firstName, lastName, roleId, managerId) => {
  try {
    await connection.promise().query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
    console.log('Employee added successfully!');
  } catch (error) {
    console.error('Error adding employee:', error);
  }
};

const updateEmployeeRole = async (employeeId, roleId) => {
  try {
    await connection.promise().query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId]);
    console.log('Employee role updated successfully!');
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
};

export {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
