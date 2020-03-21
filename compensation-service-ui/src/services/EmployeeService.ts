import HttpUtil from "../utils/HttpUtil";
import * as config from "../configs/uriConfig.json";
import { IEmployee } from "../interfaces/IEmployee";

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
    }
  };
};

const EmployeeService = {
  useEmployeeService
};

export default EmployeeService;
