import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const SharedLayout = () => {
  return (
    <div className="shared">
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;
