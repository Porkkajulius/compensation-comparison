import React, { useState, FormEvent } from "react";
import { IEmployee, ICompany, IJobTitle } from "../employee/IEmployee";
import styles from "./styles/chooseComparisationData.css";
interface ICreateProps {
  create: (create: IEmployee) => void;
  setShowCreateSalary: (input: boolean) => void;
  companies: ReadonlyArray<ICompany>;
  jobTitles: ReadonlyArray<IJobTitle>;
}

const initializeEmployee: IEmployee = {
  company: "",
  salary: 0,
  experience: 0,
  title: ""
};

const ChooseComparisationData: React.FC<ICreateProps> = ({ create, setShowCreateSalary, companies, jobTitles }) => {
  const [employee, setEmployee] = useState<IEmployee>(initializeEmployee);

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.type === "number"
      ? setEmployee({ ...employee, [e.currentTarget.name]: e.currentTarget.valueAsNumber })
      : setEmployee({ ...employee, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleCreateEmployee = (e: FormEvent) => {
    e.preventDefault();
    create(employee);
    setShowCreateSalary(false);
  };

  return (
    <>
      <div className={styles.blur}>
        <form onSubmit={e => handleCreateEmployee(e)}>
          <label>
            Company:
            <input
              type="text"
              name="company"
              onChange={e => {
                onInputChange(e);
              }}
            />
          </label>
          <label>
            Salary:
            <input
              type="number"
              name="salary"
              onChange={e => {
                onInputChange(e);
              }}
            />
          </label>
          <label>
            Experience years:
            <input
              type="number"
              name="experience"
              onChange={e => {
                onInputChange(e);
              }}
            />
          </label>
          <label>
            Job title:
            <input
              type="text"
              name="title"
              onChange={e => {
                onInputChange(e);
              }}
            />
          </label>
          <br></br>
          <input type="submit" value="Add" />
        </form>
      </div>
    </>
  );
};

export { ChooseComparisationData };
