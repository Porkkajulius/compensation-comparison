import React from "react";
import styles from "./styles/header.css";
import { Link } from "react-router-dom";
import { routes } from "../routers";
const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <h1 className="wrapper">Logo</h1>
      </div>
      <div className={styles.linkContainer}>
        {routes.map(route => {
          return (
            <span key={route.name}>
              <Link to={route.path}>{route.name}</Link>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export { Header };
