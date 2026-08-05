import { useState } from "react";
import API from "../services/api";

function EmployeeForm({ fetchEmployees }) {

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/employees", employee);

      alert("Employee Added Successfully");

      setEmployee({
        name: "",
        email: "",
        department: "",
        salary: "",
      });

      fetchEmployees();

    } catch (error) {
      console.error(error);
      alert("Failed to add employee");
    }
  };

  return (
    <div className="form-container">

      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={employee.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Employee Email"
          value={employee.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Employee
        </button>

      </form>

    </div>
  );
}

export default EmployeeForm;