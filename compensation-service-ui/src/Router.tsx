import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { routes } from "./routers";
import DefaultLayout from "./layouts/DefaultLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Switch>
          {routes.map(route => {
            return <Route key={route.name} exact={route.exact} path={route.path} component={route.component}></Route>;
          })}
        </Switch>
      </DefaultLayout>
    </BrowserRouter>
  );
};

export { Router };
