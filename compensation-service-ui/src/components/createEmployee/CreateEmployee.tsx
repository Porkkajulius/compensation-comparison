import React, { useState, FormEvent } from "react";
import { IEmployee, ICompany, IJobTitle } from "../employee/IEmployee";
import styles from "./styles/createEmployee.css";
import dashStyles from "../../views/dashboard/styles/dashboard.module.css";
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

const CreateEmployee: React.FC<ICreateProps> = ({ create, setShowCreateSalary, companies, jobTitles }) => {
  const [employee, setEmployee] = useState<IEmployee>(initializeEmployee);

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.type === "number"
      ? setEmployee({ ...employee, [e.currentTarget.name]: e.currentTarget.valueAsNumber })
      : setEmployee({ ...employee, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onSelectInputChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setEmployee({ ...employee, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleCreateEmployee = (e: FormEvent) => {
    e.preventDefault();
    create(employee);
    setShowCreateSalary(false);
  };
  console.log("emp", employee);
  return (
    <>
      <div className={styles.blur}>
        <form onSubmit={e => handleCreateEmployee(e)}>
          <label>Company:</label>
          <select
            name="company"
            id="dropdown"
            onChange={e => {
              onSelectInputChange(e);
            }}
          >
            {companies.map(company => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>

          <br></br>
          <label>Job title:</label>
          <select
            name="title"
            id="dropdown"
            onChange={e => {
              onSelectInputChange(e);
            }}
          >
            {jobTitles.map((title, index) => (
              <option key={index} value={title.id}>
                {title.name}
              </option>
            ))}
          </select>
          <label>Experience years:</label>
          <input
            type="number"
            name="experience"
            onChange={e => {
              onInputChange(e);
            }}
          />
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            onChange={e => {
              onInputChange(e);
            }}
          />
          <input type="submit" value="Add" className={dashStyles.myButton} />
        </form>
      </div>
    </>
  );
};

export { CreateEmployee };
