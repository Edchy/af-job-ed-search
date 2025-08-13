import { Outlet } from "react-router";

import Header from "../Components/Header";
import { Footer } from "../Components/Footer";

export const Layout = () => {
  return (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  );
};
