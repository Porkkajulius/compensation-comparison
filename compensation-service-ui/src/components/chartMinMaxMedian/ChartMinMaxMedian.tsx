import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { IMinMaxMedianSalary } from "../employee/IEmployee";
interface IChartProps {
  salaries: ReadonlyArray<IMinMaxMedianSalary>;
  width: number;
  height: number;
  className: string;
}

const ChartMinMaxMedian: React.FC<IChartProps> = ({ salaries, width, height, className }) => {
  return (
    <BarChart
      className={className}
      width={width}
      height={height}
      data={salaries}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="corporate" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="min" fill="#3EB7F8" />
      <Bar dataKey="median" fill="#52F012" />
      <Bar dataKey="max" fill="#FAFE0A" />
    </BarChart>
  );
};

export { ChartMinMaxMedian };
