import React, { useState } from "react";
import styles from "./styles/list.css";
import dashStyles from "../../views/dashboard/styles/dashboard.module.css";
import { ChooseComparisationData } from "../chooseComparisationData/ChooseComparisationData";
import { ICompany, IJobTitle, IListData } from "../employee/IEmployee";

interface IListProps {
  companies: ReadonlyArray<ICompany>;
  jobTitles: ReadonlyArray<IJobTitle>;
  handleCompareSalaryClick: () => void;
  fetchMinMedianAndMaxEmployeesByJobTitleByCorporate: (jobTitle: string, companies: string[]) => void;
  fetchSalaryIncreaseByExperienceYearsFromCorporates: (jobTitle: string, companies: string[]) => void;
  removeItemFromChartDatas: (data: IListData) => void;
}

const CorporateByJobTitleList: React.FC<IListProps> = ({
  companies,
  jobTitles,
  handleCompareSalaryClick,
  fetchMinMedianAndMaxEmployeesByJobTitleByCorporate,
  fetchSalaryIncreaseByExperienceYearsFromCorporates,
  removeItemFromChartDatas
}) => {
  const [showAddNewRow, setShowAddNewRow] = useState<boolean>(false);
  const [listData, setListData] = useState<ReadonlyArray<IListData>>([]);

  const handleShowNewRow = () => {
    handleCompareSalaryClick();
    setShowAddNewRow(true);
  };

  const addItemToListData = (input: IListData) => {
    setShowAddNewRow(false);
    setListData(listData => [...listData, input]);
    const companies: string[] = [input.companyId];
    const jobTitle: string = [input.jobTitleId][0];
    fetchMinMedianAndMaxEmployeesByJobTitleByCorporate(jobTitle, companies);
    fetchSalaryIncreaseByExperienceYearsFromCorporates(jobTitle, companies);
  };

  const handleRemoveFromList = (input: IListData) => {
    setListData(listData.filter(item => !(item.companyId === input.companyId && item.jobTitleId === input.jobTitleId)));
    removeItemFromChartDatas(input);
  };
  return (
    <>
      <table className={styles.darkTable}>
        <thead>
          <tr>
            <th>Company</th>
            <th>Job title</th>
          </tr>
        </thead>
        <tbody>
          {listData.map((data, index) => (
            <tr key={index}>
              <td>{data.company}</td>
              <td>{data.jobTitle}</td>
              <td>
                <button
                  className={dashStyles.myButton}
                  onClick={() =>
                    handleRemoveFromList({
                      company: data.company,
                      companyId: data.companyId,
                      jobTitleId: data.jobTitleId,
                      jobTitle: data.jobTitle
                    })
                  }
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {showAddNewRow && (
            <tr>
              <ChooseComparisationData
                companies={companies}
                jobTitles={jobTitles}
                addItemToListData={addItemToListData}
              ></ChooseComparisationData>
            </tr>
          )}
        </tbody>
      </table>
      <button className={dashStyles.myButton} onClick={() => handleShowNewRow()}>
        Add company to charts
      </button>
    </>
  );
};

export { CorporateByJobTitleList };
