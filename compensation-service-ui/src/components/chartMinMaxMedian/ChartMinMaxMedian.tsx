import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ISalary } from "../employee/IEmployee";
interface IChartProps {
  salaries: ReadonlyArray<ISalary>;
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
      <Bar dataKey="min" fill="#FFC300" />
      <Bar dataKey="median" fill="#FF5733" />
      <Bar dataKey="max" fill="#C70039" />
    </BarChart>
  );
};

export { ChartMinMaxMedian };
