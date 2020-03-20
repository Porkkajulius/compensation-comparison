import React, { useState, useEffect } from "react";
import styles from "./styles/dashboard.module.css";
import { Chart } from "../components/Chart";
export interface IEmployee {
  company: string;
  salary: string;
}

const Dashboard: React.FC = ({}) => {
  const [employees, setEmployees] = useState<ReadonlyArray<IEmployee>>([]);

  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/api/v1/employee");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const width = 800;
  const height = 600;
  return (
    <div className={styles.wrapper}>
      <Chart employees={employees} height={height} width={width} className={styles.topLeft} />
      <Chart employees={employees} height={height} width={width} className={styles.topRight} />
      <Chart employees={employees} height={height} width={width} className={styles.bottomLeft} />
      <Chart employees={employees} height={height} width={width} className={styles.bottomRight} />
    </div>
  );
};

export { Dashboard };
