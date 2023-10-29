const db = require('../config/connection');

module.exports = {
  // Function to add a role
  addRole: (title, salary, department_id, callback) => {
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    const params = [title, salary, department_id];

    db.query(sql, params, callback);
  },

  // Function to view all roles
  viewAllRoles: (callback) => {
    const sql = 'SELECT * FROM role';
    db.query(sql, callback);
  },

  // Function to delete a role by ID
  deleteRole: (id, callback) => {
    const sql = 'DELETE FROM role WHERE id = ?';
    const params = [id];
    db.query(sql, params, callback);
  },
};
