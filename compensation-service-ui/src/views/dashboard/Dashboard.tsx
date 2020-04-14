import React, { useState, useEffect } from "react";
import styles from "./styles/dashboard.module.css";
import EmployeeService from "../../components/employee/EmployeeService";
import { CreateEmployee } from "../../components/createEmployee/CreateEmployee";
import {
  IEmployee,
  IMinMaxMedianSalary,
  ICompany,
  IJobTitle,
  ISalaryIncrease
} from "../../components/employee/IEmployee";
import { ChartMinMaxMedian } from "../../components/chartMinMaxMedian/ChartMinMaxMedian";
import { ChartSalaryIncreaseByExperienceYears } from "../../components/chartSalaryIncreaseByExperience/ChartSalaryIncreaseByExperienceYears";
import { ChooseComparisationData } from "../../components/chooseComparisationData/ChooseComparisationData";
import { CorporateByJobTitleList } from "../../components/corporateByJobTitleList/CorporateByJobTitleList";

const width = 600;
const height = 300;

const Dashboard: React.FC = ({}) => {
  const employeeService = EmployeeService.useEmployeeService();
  const [showCreateSalary, setShowCreateSalary] = useState<boolean>(false);
  const [showCompareSalary, setShowCompareSalary] = useState<boolean>(false);
  const [companies, setCompanies] = useState<ReadonlyArray<ICompany>>([]);
  const [jobTitles, setJobTitles] = useState<ReadonlyArray<IJobTitle>>([]);
  const [employees, setEmployees] = useState<ReadonlyArray<IEmployee>>([]);
  const [salaries, setSalaries] = useState<ReadonlyArray<IMinMaxMedianSalary>>([]);
  const [salaryIncreases, setSalaryIncreases] = useState<ReadonlyArray<ISalaryIncrease>>([]);
  useEffect(() => {
    fetchMinMedianAndMaxEmployeesByJobTitleByCorporate([
      "5e7b67a91815f36155078206",
      "5e7b67aa1815f36155078207",
      "5e7b67aa1815f36155078208"
    ]);
    fetchSalaryIncreaseByExperienceYearsFromCorporates([
      "5e7b67a91815f36155078206",
      "5e7b67aa1815f36155078207",
      "5e7b67aa1815f36155078208"
    ]);
  }, []);

  const fetchMinMedianAndMaxEmployeesByJobTitleByCorporate = async (companies: string[]) => {
    setSalaries(
      await employeeService.getMinMedianAndMaxEmployeesByJobTitleByCorporate("5e7b67dd1815f3615507820a", companies)
    );
  };

  const fetchSalaryIncreaseByExperienceYearsFromCorporates = async (companies: string[]) => {
    setSalaryIncreases(
      await employeeService.getSalaryIncreaseByExperienceYearsFromCorporates("5e7b67dd1815f3615507820a", companies)
    );
  };

  const create = async (employee: IEmployee) => {
    await employeeService.postEmployee(employee);
    setEmployees([...employees, employee]);
  };

  const handleCompareSalaryClick = async () => {
    setCompanies(await employeeService.getCompanies());
    setJobTitles(await employeeService.getJobTitles());
    setShowCompareSalary(true);
  };

  const handleCreateSalaryClick = () => {
    setShowCreateSalary(true);
  };

  return (
    <>
      {showCompareSalary && (
        <div>
          <ChooseComparisationData
            companies={companies}
            jobTitles={jobTitles}
            create={create}
            setShowCreateSalary={setShowCreateSalary}
          />
        </div>
      )}
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
        <CorporateByJobTitleList></CorporateByJobTitleList>
        <br></br>
        <button className={styles.myButton} onClick={() => handleCompareSalaryClick()}>
          Add company to charts
        </button>

        <button className={styles.myButton} onClick={() => handleCreateSalaryClick()}>
          Add salary
        </button>
      </div>
    </>
  );
};

export { Dashboard };
