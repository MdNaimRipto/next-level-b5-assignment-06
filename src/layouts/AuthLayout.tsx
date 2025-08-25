import { Navigate, Outlet, useLocation } from "react-router";

const AuthLayout = () => {
  const { pathname } = useLocation();

  if (pathname === "/auth") {
    return <Navigate to="/auth/login" replace />;
  }

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
