import React, { useState } from "react";
import { IEmployee } from "../interfaces/IEmployee";
//import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
interface ICreateProps {
  create: (create: IEmployee) => void;
}

const initializeEmployee: IEmployee = {
  company: "",
  salary: 0
};

const CreateEmployee: React.FC<ICreateProps> = ({ create }) => {
  const [employee, setEmployee] = useState<IEmployee>(initializeEmployee);

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <>
      <div>
        <form onSubmit={e => create(employee)}>
          <input
            type="text"
            name="company"
            onChange={e => {
              onInputChange(e);
            }}
          />
          <input
            type="text"
            name="salary"
            onChange={e => {
              onInputChange(e);
            }}
          />
          <input type="submit" value="Add" />
        </form>
      </div>
    </>
  );
};

export { CreateEmployee };
