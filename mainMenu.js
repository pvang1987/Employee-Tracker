const inquirer = require('inquirer');
const departmentFunctions = require('./lib/departments');
const roleFunctions = require('./lib/roles');
const employeeFunctions = require('./lib/employees');

function mainMenu(app, db) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'Add a department',
          'Delete a department',
          'View all roles',
          'Add a role',
          'Delete a role',
          'View all employees',
          'View employees by manager', 
          'View employees by department', 
          'Add an employee',
          'Delete an employee',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View all departments':
          departmentFunctions.viewAllDepartments((err, rows) => {
            if (err) {
              console.error(err);
            } else {
              console.log('All Departments:');
              for (const row of rows) {
                console.log(`ID: ${row.id} | Name: ${row.name}`);
              }
            }
            mainMenu(app, db);
          });
          break;
        case 'Add a department':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'name',
                message: 'Enter the department name:',
              },
            ])
            .then((answers) => {
              departmentFunctions.addDepartment(answers.name, (err, result) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log('Department added successfully!');
                }
                mainMenu(app, db);
              });
            });
          break;
        case 'Delete a department':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'id',
                message: 'Enter the ID of the department to delete:',
              },
            ])
            .then((answers) => {
              departmentFunctions.deleteDepartment(answers.id, (err, result) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log('Department deleted successfully!');
                }
                mainMenu(app, db);
              });
            });
          break;
        case 'View all roles':
          roleFunctions.viewAllRoles((err, rows) => {
            if (err) {
              console.error(err);
            } else {
              console.log('All Roles:');
              for (const row of rows) {
                console.log(`ID: ${row.id} | Title: ${row.title} | Salary: ${row.salary}`);
              }
            }
            mainMenu(app, db);
          });
          break;
        case 'Add a role':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'title',
                message: 'Enter the role title:',
              },
              {
                type: 'input',
                name: 'salary',
                message: 'Enter the role salary:',
              },
              {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department ID:',
              },
            ])
            .then((answers) => {
              roleFunctions.addRole(answers.title, answers.salary, answers.department_id, (err, result) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log('Role added successfully!');
                }
                mainMenu(app, db);
              });
            });
          break;
        case 'Delete a role':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'id',
                message: 'Enter the ID of the role to delete:',
              },
            ])
            .then((answers) => {
              roleFunctions.deleteRole(answers.id, (err, result) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log('Role deleted successfully!');
                }
                mainMenu(app, db);
              });
            });
          break;
        case 'View all employees':
          employeeFunctions.viewAllEmployees((err, rows) => {
            if (err) {
              console.error(err);
            } else {
              console.log('All Employees:');
              for (const row of rows) {
                console.log(`ID: ${row.id} | First Name: ${row.first_name} | Last Name: ${row.last_name}`);
              }
            }
            mainMenu(app, db);
          });
          break;
          case 'View employees by manager':
            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'manager_id',
                  message: 'Enter the manager ID to view employees:',
                },
              ])
              .then((answers) => {
                employeeFunctions.viewEmployeesByManager(answers.manager_id, (err, rows) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log('Employees by Manager:');
                    for (const row of rows) {
                      console.log(`ID: ${row.id} | First Name: ${row.first_name} | Last Name: ${row.last_name}`);
                    }
                  }
                  mainMenu(app, db);
                });
              });
            break;
          case 'View employees by department':
            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'department_id',
                  message: 'Enter the department ID to view employees:',
                },
              ])
              .then((answers) => {
                employeeFunctions.viewEmployeesByDepartment(answers.department_id, (err, rows) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log('Employees by Department:');
                    for (const row of rows) {
                      console.log(`ID: ${row.id} | First Name: ${row.first_name} | Last Name: ${row.last_name}`);
                    }
                  }
                  mainMenu(app, db);
                });
              });
            break;
          case 'Add an employee':
            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'first_name',
                  message: 'Enter the first name:',
                },
                {
                  type: 'input',
                  name: 'last_name',
                  message: 'Enter the last name:',
                },
                {
                  type: 'input',
                  name: 'role_id',
                  message: 'Enter the role ID:',
                },
                {
                  type: 'input',
                  name: 'manager_id',
                  message: 'Enter the manager ID (or leave blank if none):',
                },
              ])
              .then((answers) => {
                employeeFunctions.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id, (err, result) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log('Employee added successfully!');
                  }
                  mainMenu(app, db);
                });
              });
            break;
          case 'Delete an employee':
            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'id',
                  message: 'Enter the ID of the employee to delete:',
                },
              ])
              .then((answers) => {
                employeeFunctions.deleteEmployee(answers.id, (err, result) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log('Employee deleted successfully!');
                  }
                  mainMenu(app, db);
                });
              });
            break;
          case 'Exit':
            // Exit the application
            break;
          }
        });
    }
    
    module.exports = mainMenu;