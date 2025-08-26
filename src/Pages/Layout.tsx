import { Outlet } from "react-router";

import Header from "../Components/Header";
import { Footer } from "../Components/Footer";

export const Layout = () => {
  return (
    <div className="app-layout">
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};
