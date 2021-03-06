import { Dashboard } from "./views/dashboard/Dashboard";
import { Test } from "./views/dashboard/Test";

type RouteProp = {
  component: React.ComponentType;
  path: string;
  exact: boolean;
  name: string;
};

const routes: RouteProp[] = [
  {
    name: "Dashboard",
    path: "/",
    component: Dashboard,
    exact: true
  },
  {
    name: "Other",
    path: "/other",
    component: Test,
    exact: false
  }
];

export { routes };
