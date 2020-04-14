import HttpUtil from "../../utils/HttpUtil";
import * as config from "../../configs/uriConfig.json";
import { IEmployee, IMinMaxMedianSalary, ICompany, IJobTitle, ISalaryIncrease } from "./IEmployee";

const useEmployeeService = () => {
  const { fetchGet, fetchPost } = HttpUtil.useHttpService();
  return {
    getEmployees: async () => {
      const result = await fetchGet(config.employeeUri);
      const employees: IEmployee[] = await result.json();
      return employees.map((i: IEmployee) => i);
    },
    postEmployee: async (body: IEmployee) => {
      return await fetchPost(config.employeeUri, body);
    },
    getMinMedianAndMaxEmployeesByJobTitleByCorporate: async (company: string, body: string[]) => {
      const result = await fetchPost(config.employeeUri + "/corporates/minMaxMedian/" + company, body);
      const employees: IMinMaxMedianSalary[] = await result.json();
      employees.map((i: IMinMaxMedianSalary) => i);
      return employees;
    },
    getSalaryIncreaseByExperienceYearsFromCorporates: async (company: string, body: string[]) => {
      const result = await fetchPost(config.employeeUri + "/corporates/salaryIncrease/" + company, body);
      const employees: ISalaryIncrease[] = await result.json();
      employees.map((i: ISalaryIncrease) => i);
      return employees;
    },
    getCompanies: async () => {
      const result = await fetchGet(config.companyUri);
      const companies: ICompany[] = await result.json();
      return companies.map((i: ICompany) => i);
    },
    getJobTitles: async () => {
      const result = await fetchGet(config.jobTitleUri);
      const jobTitles: IJobTitle[] = await result.json();
      return jobTitles.map((i: IJobTitle) => i);
    }
  };
};

const EmployeeService = {
  useEmployeeService
};

export default EmployeeService;
