import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface IChartProps {
  width: number;
  height: number;
  className: string;
}

const strokes = ["#3EB7F8", "#52F012", "#FAFE0A"];
const data = [
  {
    name: "Tieto",
    data: [
      { experience: 0, salary: 2400 },
      { experience: 1, salary: 5000 },
      { experience: 2, salary: 5000 },
      { experience: 3, salary: 6000 }
    ]
  },
  {
    name: "CGI",
    data: [
      { experience: 0, salary: 3000 },
      { experience: 1, salary: 3000 },
      { experience: 2, salary: 4000 },
      { experience: 3, salary: 4000 }
    ]
  },
  {
    name: "Accenture",
    data: [
      { experience: 0, salary: 1300 },
      { experience: 1, salary: 3000 },
      { experience: 2, salary: 3300 },
      { experience: 3, salary: 5000 }
    ]
  }
];

const ChartSalaryIncreaseByExperienceYears: React.FC<IChartProps> = ({ width, height, className }) => {
  return (
    <LineChart className={className} width={width} height={height}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="experience" type="number" allowDuplicatedCategory={false} allowDecimals={false} />
      <YAxis dataKey="salary" />
      <Tooltip />
      <Legend />
      {data.map((s, index) => (
        <Line dataKey="salary" data={s.data} name={s.name} key={s.name} type="monotone" stroke={strokes[index]} />
      ))}
    </LineChart>
  );
};

export { ChartSalaryIncreaseByExperienceYears };
