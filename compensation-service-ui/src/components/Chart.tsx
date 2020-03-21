import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { IEmployee } from "../interfaces/IEmployee";
interface IChartProps {
  employees: ReadonlyArray<IEmployee>;
  width: number;
  height: number;
  className: string;
}

const Chart: React.FC<IChartProps> = ({ employees, width, height, className }) => {
  return (
    <BarChart
      className={className}
      width={width}
      height={height}
      data={employees}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="title" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="salary" fill="#8884d8" />
    </BarChart>
  );
};

export { Chart };
