import { Outlet } from "react-router-dom";
import AppNavBar from "../components/AppBar";
const Layout = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <AppNavBar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Layout;
