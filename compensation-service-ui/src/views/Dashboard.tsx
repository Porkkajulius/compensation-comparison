import React from "react";
import styles from "./styles/dashboard.module.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  {
    month: "January",
    Pay: 4000
  },
  {
    month: "February",
    Pay: 3000
  },
  {
    month: "March",
    Pay: 2960
  },
  {
    month: "April",
    Pay: 2780
  },
  {
    month: "May",
    Pay: 1890
  },
  {
    month: "June",
    Pay: 2390
  },
  {
    month: "July",
    Pay: 3490
  },
  {
    month: "August",
    Pay: 2490
  },
  {
    month: "September",
    Pay: 1790
  },
  {
    month: "October",
    Pay: 5890
  },
  {
    month: "November",
    Pay: 6600
  },
  {
    month: "December",
    Pay: 3000
  }
];

type ChartProps = {
  width: number;
  height: number;
  className: string;
};

const Chart = ({ width, height, className }: ChartProps) => {
  return (
    <LineChart
      className={className}
      width={width}
      height={height}
      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      data={data}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis stroke="#82ca9d" dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Pay" stroke="#82ca9d" />
    </LineChart>
  );
};
const Dashboard = () => {
  const width = 800;
  const height = 600;
  return (
    <div className={styles.wrapper}>
      <Chart height={height} width={width} className={styles.topLeft} />
      <Chart height={height} width={width} className={styles.topRight} />
      <Chart height={height} width={width} className={styles.bottomLeft} />
      <Chart height={height} width={width} className={styles.bottomRight} />
    </div>
  );
};

export { Dashboard };
