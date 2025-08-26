import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import Footer from "@/shared/footer/Footer";
// import Navbar from "@/shared/navbar/Navbar";
import { Navigate, Outlet, useLocation } from "react-router";

export default function UserLayout() {
  const { pathname } = useLocation();
  if (pathname === "/user") {
    return <Navigate to="/user/account" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen my-12">
      {/* <Navbar /> */}

      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>

      {/* <Footer /> */}
    </div>
  );
}
