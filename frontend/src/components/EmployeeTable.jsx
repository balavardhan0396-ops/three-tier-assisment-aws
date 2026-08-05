function EmployeeTable({ employees }) {

  return (

    <div className="table-container">

      <h2>Employee List</h2>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {employees.map((employee) => (

            <tr key={employee.id}>

              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>₹{employee.salary}</td>

              <td>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default EmployeeTable;