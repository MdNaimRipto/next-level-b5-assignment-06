import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUserContext } from "@/context/AuthContext";
import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/Navbar";
import { CarFront, User } from "lucide-react";
import { Navigate, Outlet, useLocation } from "react-router";

export default function UserLayout() {
  const { pathname } = useLocation();
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (pathname === "/user") {
    return <Navigate to="/user/account" replace />;
  }

  // Menu items.
  const items = [
    {
      title: "My Account",
      url: "/user/account",
      icon: User,
    },
    {
      title: "My Rides",
      url: "/user/myRides",
      icon: CarFront,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SidebarProvider>
        <AppSidebar items={items} />
        <main className="w-full">
          <Navbar />
          <br />
          <div className="min-h-screen">
            <div className="container px-4 mx-auto">
              <SidebarTrigger />
            </div>
            <Outlet />
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </div>
  );
}
