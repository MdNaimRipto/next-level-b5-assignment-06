import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/Navbar";
import { Navigate, Outlet, useLocation } from "react-router";

export default function UserLayout() {
  const { pathname } = useLocation();
  if (pathname === "/user") {
    return <Navigate to="/user/account" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
