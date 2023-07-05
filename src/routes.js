import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";
import EmptyLeg from "layouts/empty-leg";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Aircrafts",
    key: "profile",
    icon: <Icon fontSize="small">flight</Icon>,
    route: "/aircraft",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Add Flight",
    key: "add flight",
    icon: <Icon fontSize="small">add flight</Icon>,
    route: "/add-flight",
    component: <EmptyLeg />,
  },
];

export default routes;
