const mysql = require('mysql2');
const connection = require('../config/connection'); // Use your database connection configuration

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the employee_db database.');

  // Define your SQL statements to insert data
  const departmentSQL = `
    INSERT INTO department (name) VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");
  `;

  const roleSQL = `
    INSERT INTO role (department_id, title, salary) VALUES
    (1, "Sales Lead", 200000),
    (1, "Salesperson", 150000),
    (2, "Lead Engineer", 250000),
    (2, "Software Engineer", 200000),
    (3, "Account Manager", 180000),
    (3, "Accountant", 150000),
    (4, "Legal Team Lead", 150000),
    (4, "Lawyer", 300000);
  `;

  const employeeSQL = `
  INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ("John", "Doe", 1, NULL),      -- Sales Lead (Sales department)
  ("Mike", "Chan", 2, 1),       -- Salesperson (Sales department)
  ("Ashley", "Rodriguez", 3, NULL), -- Lead Engineer (Engineering department)
  ("Kevin", "Tupik", 4, 3),    -- Software Engineer (Engineering department)
  ("Kunal", "Singh", 5, NULL),  -- Account Manager (Finance department)
  ("Malia", "Brown", 6, 5),    -- Accountant (Finance department)
  ("Sarah", "Lourd", 7, NULL), -- Legal Team Lead (Legal department)
  ("Tom", "Allen", 8, 7),     -- Lawyer (Legal department)
  ("Sam", "Kash", 2, 1);      -- Salesperson (Sales department)
`;

  // Execute the SQL statements
  connection.query(departmentSQL, (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Department data inserted successfully.');
    }
  });

  connection.query(roleSQL, (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Role data inserted successfully.');
    }
  });

  connection.query(employeeSQL, (error, results) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Employee data inserted successfully.');
    }

    connection.end();
  });
});
