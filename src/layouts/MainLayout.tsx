import type { ReactNode } from "react";
import Footer from "../shared/footer/Footer";
import Navbar from "../shared/navbar/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" min-h-screen flex flex-col">
      <Navbar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
