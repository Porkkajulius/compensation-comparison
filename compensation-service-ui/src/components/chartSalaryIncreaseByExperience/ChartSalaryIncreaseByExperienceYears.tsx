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
const data = [
  {
    data: [
      {
        experience: 1,
        salary: 2500
      },
      {
        experience: 2,
        salary: 3000
      },
      {
        experience: 3,
        salary: 4000
      },
      {
        experience: 4,
        salary: 6000
      },
      {
        experience: 5,
        salary: 8000
      }
    ],
    name: "TietoEvry"
  },
  {
    data: [
      {
        experience: 5,
        salary: 2000
      },
      {
        experience: 15,
        salary: 9000
      },
      {
        experience: 20,
        salary: 12000
      }
    ],
    name: "Qentinel"
  }
];

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
