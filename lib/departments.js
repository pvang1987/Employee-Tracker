const db = require('../config/connection');

module.exports = {
  // Function to add a department
  addDepartment: (name, callback) => {
    const sql = 'INSERT INTO department (name) VALUES (?)';
    const params = [name];

    db.query(sql, params, callback);
  },

  // Function to view all departments
  viewAllDepartments: (callback) => {
    const sql = 'SELECT * FROM department';
    db.query(sql, callback);
  },

  // Function to delete a department by ID
  deleteDepartment: (id, callback) => {
    const sql = 'DELETE FROM department WHERE id = ?';
    const params = [id];
    db.query(sql, params, callback);
  },
};
