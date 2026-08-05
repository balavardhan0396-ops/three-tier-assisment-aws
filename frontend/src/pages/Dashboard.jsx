import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import API from "../services/api";

function Dashboard() {

  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await API.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <Header />

      <div className="container">
        <Sidebar />

        <main className="content">

          <EmployeeForm fetchEmployees={fetchEmployees} />

          <EmployeeTable employees={employees} />

        </main>
      </div>
    </>
  );
}

export default Dashboard;