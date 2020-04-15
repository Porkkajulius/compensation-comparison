import React, { useState } from "react";
import styles from "./styles/dashboard.module.css";
import EmployeeService from "../../components/employee/EmployeeService";
import { CreateEmployee } from "../../components/createEmployee/CreateEmployee";
import {
  IEmployee,
  ICompany,
  IJobTitle,
  ISalaryIncrease,
  IListData,
  ISalary
} from "../../components/employee/IEmployee";
import { ChartMinMaxMedian } from "../../components/chartMinMaxMedian/ChartMinMaxMedian";
import { ChartSalaryIncreaseByExperienceYears } from "../../components/chartSalaryIncreaseByExperience/ChartSalaryIncreaseByExperienceYears";
import { CorporateByJobTitleList } from "../../components/corporateByJobTitleList/CorporateByJobTitleList";

const width = 600;
const height = 300;

const Dashboard: React.FC = ({}) => {
  const employeeService = EmployeeService.useEmployeeService();
  const [showCreateSalary, setShowCreateSalary] = useState<boolean>(false);
  const [companies, setCompanies] = useState<ReadonlyArray<ICompany>>([]);
  const [jobTitles, setJobTitles] = useState<ReadonlyArray<IJobTitle>>([]);
  const [employees, setEmployees] = useState<ReadonlyArray<IEmployee>>([]);
  const [salaries, setSalaries] = useState<ReadonlyArray<ISalary>>([]);
  const [salaryIncreases, setSalaryIncreases] = useState<ReadonlyArray<ISalaryIncrease>>([]);

  const fetchMinMedianAndMaxEmployeesByJobTitleByCorporate = async (jobTitle: string, companies: string[]) => {
    const newSalaries: ISalary[] = await employeeService.getMinMedianAndMaxEmployeesByJobTitleByCorporate(
      jobTitle,
      companies
    );
    const finalArray = [...salaries, ...newSalaries];
    setSalaries(finalArray);
  };

  const fetchSalaryIncreaseByExperienceYearsFromCorporates = async (jobTitle: string, companies: string[]) => {
    const newSalaryIncreases: ISalaryIncrease[] = await employeeService.getSalaryIncreaseByExperienceYearsFromCorporates(
      jobTitle,
      companies
    );
    const finalArray = [...salaryIncreases, ...newSalaryIncreases];
    setSalaryIncreases(finalArray);
  };

  const create = async (employee: IEmployee) => {
    await employeeService.postEmployee(employee);
    setEmployees([...employees, employee]);
  };

  const handleCompareSalaryClick = async () => {
    setCompanies(await employeeService.getCompanies());
    setJobTitles(await employeeService.getJobTitles());
  };

  const handleCreateSalaryClick = () => {
    setShowCreateSalary(true);
  };

  const removeItemFromChartDatas = (input: IListData) => {
    // TODO lisää ehtoihin myös titteli... nyt poistaa kaikki kyseiseltä firmalta vaikka olisi eri titteli
    setSalaries(salaries.filter(item => item.corporate !== input.company));
    setSalaryIncreases(salaryIncreases.filter(item => item.name !== input.company));
  };
  return (
    <>
      {showCreateSalary && (
        <div>
          <CreateEmployee create={create} setShowCreateSalary={setShowCreateSalary} />
        </div>
      )}
      {salaries.length > 0 && (
        <div className={styles.wrapper}>
          <ChartMinMaxMedian salaries={salaries} height={height} width={width} className={styles.topLeft} />
          <ChartSalaryIncreaseByExperienceYears
            salaryIncreases={salaryIncreases}
            height={height}
            width={width}
            className={styles.topRight}
          ></ChartSalaryIncreaseByExperienceYears>
        </div>
      )}
      <div className={styles.middleWhole}>
        <CorporateByJobTitleList
          companies={companies}
          jobTitles={jobTitles}
          handleCompareSalaryClick={handleCompareSalaryClick}
          fetchMinMedianAndMaxEmployeesByJobTitleByCorporate={fetchMinMedianAndMaxEmployeesByJobTitleByCorporate}
          fetchSalaryIncreaseByExperienceYearsFromCorporates={fetchSalaryIncreaseByExperienceYearsFromCorporates}
          removeItemFromChartDatas={removeItemFromChartDatas}
        ></CorporateByJobTitleList>
        <br></br>
        <button className={styles.myButton} onClick={() => handleCreateSalaryClick()}>
          Add salary
        </button>
      </div>
    </>
  );
};

export { Dashboard };
