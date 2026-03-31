import { FaHome } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import Template from "@/pages/template";
import Login from "@/pages/login";
import Home from "@/pages/home";
import Estates from "@/pages/estates";

const routes = [
  {
    path: "/",
    component: Template,
    name: "Template",
    exact: true,
    private: false,
    icon: null,
    enabled: true,
    routeEnabled: false,
    layout: false,
  },
  {
    path: "/login",
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
