import React from "react";
import styles from "./styles/list.css";
//import delete_image from "./images/delete_image.png";
const data = [
  {
    name: "Tieto",
    jobTitle: "Backend-developer"
  },
  {
    name: "Quentinel",
    jobTitle: "Backend-developer"
  },
  {
    name: "OP",
    jobTitle: "Backend-developer"
  }
];

const CorporateByJobTitleList: React.FC = ({}) => {
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
          {data.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.jobTitle}</td>
              <td>{/**  <img src={delete_image} />;  */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export { CorporateByJobTitleList };
