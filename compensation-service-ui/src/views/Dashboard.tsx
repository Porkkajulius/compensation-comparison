import React, { useState, useEffect } from "react";
import styles from "./styles/dashboard.module.css";
import { Chart } from "../components/Chart";
import EmployeeService from "../services/EmployeeService";
import { CreateEmployee } from "../components/CreateEmployee";
import { IEmployee } from "../interfaces/IEmployee";

const Dashboard: React.FC = ({}) => {
  const employeeService = EmployeeService.useEmployeeService();
  const [employees, setEmployees] = useState<ReadonlyArray<IEmployee>>([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setEmployees(await employeeService.getEmployees());
  };

  const create = async (employee: IEmployee) => {
    await employeeService.postEmployee(employee);
    setEmployees([...employees, employee]);
  };

  const width = 500;
  const height = 300;
  return (
    <>
      <div className={styles.wrapper}>
        <Chart employees={employees} height={height} width={width} className={styles.topLeft} />
        <Chart employees={employees} height={height} width={width} className={styles.topRight} />
        <Chart employees={employees} height={height} width={width} className={styles.bottomLeft} />
        <Chart employees={employees} height={height} width={width} className={styles.bottomRight} />
      </div>
      <div>
        <CreateEmployee create={create} />
      </div>
    </>
  );
};

export { Dashboard };
