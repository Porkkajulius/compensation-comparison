import React, { useState } from "react";
import { ICompany, IJobTitle, IListData } from "../employee/IEmployee";
import styles from "./styles/chooseComparisationData.css";
import stylesDash from "../../views/dashboard/styles/dashboard.module.css";
interface ICreateProps {
  companies: ReadonlyArray<ICompany>;
  jobTitles: ReadonlyArray<IJobTitle>;
  addItemToListData: (data: IListData) => void;
}

const initCompany: ICompany = {
  id: "",
  name: ""
};

const initJobTitle: IJobTitle = {
  id: "",
  name: ""
};

const ChooseComparisationData: React.FC<ICreateProps> = ({ companies, jobTitles, addItemToListData }) => {
  const [company, setCompany] = useState<ICompany>(initCompany);
  const [jobTitle, setJobTitle] = useState<IJobTitle>(initJobTitle);

  const onSelectInputChange = (e: React.FormEvent<HTMLSelectElement>) => {
    if (e.currentTarget.name === "company") setCompany({ name: "", id: e.currentTarget.value });
    if (e.currentTarget.name === "jobTitle") setJobTitle({ name: "", id: e.currentTarget.value });
  };

  const addToList = () => {
    // TODO nyt backend vastaanottaa arrayn mutta voisi myös vastaanottaa yhden itemin kerrallaan
    const selectedCompany: ICompany = companies.filter(item => item.id === company.id)[0];
    const selectedJobTitle: IJobTitle = jobTitles.filter(item => item.id === jobTitle.id)[0];
    const listData: IListData = {
      companyId: selectedCompany.id,
      company: selectedCompany.name,
      jobTitleId: selectedJobTitle.id,
      jobTitle: selectedJobTitle.name
    };
    addItemToListData(listData);
  };
  console.log("companies", companies);
  return (
    <>
      <td>
        <select
          className={styles.select}
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
      </td>
      <td>
        <select
          className={styles.select}
          name="jobTitle"
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
      </td>
      <td>
        <button className={stylesDash.myButton} onClick={addToList}>
          Add
        </button>
      </td>
    </>
  );
};

export { ChooseComparisationData };
