const Employee = require("../models/employeeModel");

// Get all employees
exports.getEmployees = (req, res) => {
  Employee.getEmployees((err, results) => {
    if (err)
      return res.status(500).json(err);

    res.json(results);
  });
};

// Get employee by ID
exports.getEmployeeById = (req, res) => {
  Employee.getEmployeeById(req.params.id, (err, results) => {
    if (err)
      return res.status(500).json(err);

    res.json(results[0]);
  });
};

// Add employee
exports.addEmployee = (req, res) => {
  Employee.addEmployee(req.body, (err, results) => {
    if (err)
      return res.status(500).json(err);

    res.json({
      message: "Employee Added Successfully"
    });
  });
};

// Update employee
exports.updateEmployee = (req, res) => {
  Employee.updateEmployee(
    req.params.id,
    req.body,
    (err, results) => {
      if (err)
        return res.status(500).json(err);

      res.json({
        message: "Employee Updated Successfully"
      });
    }
  );
};

// Delete employee
exports.deleteEmployee = (req, res) => {
  Employee.deleteEmployee(req.params.id, (err, results) => {
    if (err)
      return res.status(500).json(err);

    res.json({
      message: "Employee Deleted Successfully"
    });
  });
};