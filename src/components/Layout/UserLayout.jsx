import { Outlet } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer"; // 👈 import footer

const UserLayout = () => {
  return (
    <>
      <Header />

      <main className="pt-[130px] min-h-screen">
        <Outlet />
      </main>

      <Footer /> {/* footer goes here */}
    </>
  );
};

export default UserLayout;