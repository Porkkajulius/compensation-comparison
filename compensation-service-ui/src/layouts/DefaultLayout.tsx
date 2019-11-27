import React from "react";
import { Header } from "../components/Header";
import styles from "./styles/defaultLayout.css";
const DefaultLayout = (props: React.PropsWithChildren<{}>) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      {props.children}
    </div>
  );
};

export default DefaultLayout;
