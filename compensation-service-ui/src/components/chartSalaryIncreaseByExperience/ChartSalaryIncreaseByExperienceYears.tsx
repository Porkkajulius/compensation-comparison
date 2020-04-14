import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ISalaryIncrease } from "../employee/IEmployee";

interface IChartProps {
  salaryIncreases: ReadonlyArray<ISalaryIncrease>;
  width: number;
  height: number;
  className: string;
}

const strokes = ["#3EB7F8", "#52F012", "#FAFE0A"];

const ChartSalaryIncreaseByExperienceYears: React.FC<IChartProps> = ({ salaryIncreases, width, height, className }) => {
  console.log(salaryIncreases);
  return (
    <LineChart className={className} width={width} height={height}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="experience" type="number" allowDuplicatedCategory={false} allowDecimals={false} />
      <YAxis dataKey="salary" />
      <Tooltip />
      <Legend />
      {salaryIncreases.map((s, index) => (
        <Line dataKey="salary" data={s.data} name={s.name} key={s.name} type="monotone" stroke={strokes[index]} />
      ))}
    </LineChart>
  );
};

export { ChartSalaryIncreaseByExperienceYears };
