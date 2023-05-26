import inquirer from 'inquirer';
import {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  getEmployees
} from './database.js';

const startMenu = async () => {
  const choices = [
    { name: 'View all departments', value: viewDepartments },
    { name: 'View all roles', value: viewRoles },
    { name: 'View all employees', value: viewEmployees },
    { name: 'Add a department', value: promptAddDepartment },
    { name: 'Add a role', value: promptAddRole },
    { name: 'Add an employee', value: promptAddEmployee },
    { name: 'Update an employee role', value: promptUpdateEmployeeRole },
    { name: 'Exit', value: () => process.exit() }
  ];

  const { option } = await inquirer.prompt({
    name: 'option',
    type: 'list',
    message: 'What would you like to do?',
    choices
  });

  await option();
  console.log('+++++++++++++');
  startMenu();
};

const promptAddDepartment = async () => {
  const { name } = await inquirer.prompt({
    name: 'name',
    type: 'input',
    message: 'Enter the name of the department:'
  });

  await addDepartment(name);
};

const promptAddRole = async () => {
  const { title, salary, departmentId } = await inquirer.prompt([
    { name: 'title', type: 'input', message: 'Enter the title of the role:' },
    { name: 'salary', type: 'input', message: 'Enter the salary for the role:' },
    { name: 'departmentId', type: 'input', message: 'Enter the department ID for the role:' }
  ]);

  await addRole(title, salary, departmentId);
};

const promptAddEmployee = async () => {
  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    { name: 'firstName', type: 'input', message: "Enter the employee's first name:" },
    { name: 'lastName', type: 'input', message: "Enter the employee's last name:" },
    { name: 'roleId', type: 'input', message: "Enter the employee's role ID:" },
    { name: 'managerId', type: 'input', message: "Enter the employee's manager ID:" }
  ]);

  await addEmployee(firstName, lastName, roleId, managerId);
};

const promptUpdateEmployeeRole = async () => {
  try {
    const employees = await getEmployeeList();

    const { employeeId } = await inquirer.prompt({
      name: 'employeeId',
      type: 'list',
      message: 'Select an employee to update:',
      choices: employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.employee_id
      }))
    });

    const { roleId } = await inquirer.prompt({
      name: 'roleId',
      type: 'input',
      message: 'Enter the new role ID for the employee:'
    });

    await updateEmployeeRole(employeeId, roleId);
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
};

const getEmployeeList = async () => {
  try {
    const employees = await getEmployees();
    return employees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
};

export { startMenu };
