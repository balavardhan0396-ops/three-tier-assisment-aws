const db = require("../config/db");

// Get all employees
exports.getEmployees = (callback) => {
  db.getConnection().query("SELECT * FROM employees", callback);
};

// Get employee by ID
exports.getEmployeeById = (id, callback) => {
  db.getConnection().query(
    "SELECT * FROM employees WHERE id = ?",
    [id],
    callback
  );
};

// Add employee
exports.addEmployee = (employee, callback) => {
  const sql =
    "INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)";

  db.getConnection().query(
    sql,
    [
      employee.name,
      employee.email,
      employee.department,
      employee.salary,
    ],
    callback
  );
};

// Update employee
exports.updateEmployee = (id, employee, callback) => {
  const sql =
    "UPDATE employees SET name=?, email=?, department=?, salary=? WHERE id=?";

  db.getConnection().query(
    sql,
    [
      employee.name,
      employee.email,
      employee.department,
      employee.salary,
      id,
    ],
    callback
  );
};

// Delete employee
exports.deleteEmployee = (id, callback) => {
  db.getConnection().query(
    "DELETE FROM employees WHERE id=?",
    [id],
    callback
  );
};
