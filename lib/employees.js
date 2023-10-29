const db = require('../config/connection');

module.exports = {
  // Function to add an employee
  addEmployee: (first_name, last_name, role_id, manager_id, callback) => {
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    const params = [first_name, last_name, role_id, manager_id];
    db.query(sql, params, callback);
  },

  // Function to view all employees
  viewAllEmployees: (callback) => {
    const sql = 'SELECT * FROM employee';
    db.query(sql, callback);
  },

  // Function to delete an employee by ID
  deleteEmployee: (id, callback) => {
    const sql = 'DELETE FROM employee WHERE id = ?';
    const params = [id];
    db.query(sql, params, callback);
  },

  // Function to view employees by manager
  viewEmployeesByManager: (managerId, callback) => {
    const sql = 'SELECT * FROM employee WHERE manager_id = ?';
    const params = [managerId];
    db.query(sql, params, callback);
  },
  // Function to view employees by department
  viewEmployeesByDepartment(departmentId, callback) {
    const sql = `
      SELECT e.id, e.first_name, e.last_name 
      FROM employee e
      JOIN role r ON e.role_id = r.id
      WHERE r.department_id = ?;
    `;
    const params = [departmentId];
    db.query(sql, params, callback);
  }
};
