import { FaHome } from "react-icons/fa";
import Home from "../pages/home";
import Login from "@/pages/login";
import Estates from "@/pages/estates";
import { IoStatsChartSharp } from "react-icons/io5";

const routes = [
  {
    path: "/",
    component: Login,
    name: "Login",
    exact: true,
    private: false,
    icon: null,
    enabled: true,
    routeEnabled: false,
    layout: false,
  },
  {
    path: "/home",
    component: Home,
    name: "Home",
    exact: true,
    private: true,
    icon: FaHome,
    enabled: true,
    routeEnabled: true,
    layout: true,
  },
  {
    path: "/estates",
    component: Estates,
    name: "Estates",
    exact: true,
    private: true,
    icon: IoStatsChartSharp,
    enabled: true,
    routeEnabled: true,
    layout: true,
  },
];

export default routes;
