export interface IEmployee {
  company: string;
  salary: number;
  experience: number;
  title: string;
}

export interface IMinMaxMedianSalary {
  salaries: ISalary[];
}

export interface ISalary {
  corporate: string;
  max: number;
  median: number;
  min: number;
}

export interface ISalaryIncrease {
  name: string;
  data: IData[];
}

export interface IData {
  experience: number;
  salary: number;
}

export interface ICompany {
  id: string;
  name: string;
}

export interface IJobTitle {
  id: string;
  name: string;
}
