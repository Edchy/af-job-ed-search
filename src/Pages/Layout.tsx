import { Outlet } from "react-router";
import { Footer } from "../Components/Footer";
export const Layout = () => {
  return (
    <>
      <header></header>
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
};
