import Sidebar from "../Sidebar/Sidebar";
import { LayoutProps } from "./Layout.interface";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-10 overflow-x-scroll">{children}</div>
    </div>
  );
};

export default Layout;
