// STEP 1: Import all the necessary pages here
import Login_Logout from "./pages/Login-Logout";
import Dashboard from "./pages/Dashboard";

// STEP 2: Import all the necessary icons here
import { DashboardOutlined } from "@ant-design/icons";
import { AiOutlineTeam } from "react-icons/ai";

// STEP 3: Create a new object and append to the list below.
const AppContents = [
  {
    jsx: Login_Logout,
    route: "/",
    title: "Login/Register",
    icon: AiOutlineTeam,
  },
  {
    jsx: Dashboard,
    route: "/dashboard",
    title: "Dashboard",
    icon: DashboardOutlined,
  },
];

export default AppContents;
