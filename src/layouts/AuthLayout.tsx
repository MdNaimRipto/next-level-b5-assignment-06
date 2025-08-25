import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <div className="grow-1">
        <Outlet /> {/* 🔥 This renders the nested routes */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default AuthLayout;
