import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useUserContext } from "@/context/AuthContext";
import Footer from "@/shared/footer/Footer";
import Navbar from "@/shared/navbar/Navbar";
import { CarFront, DollarSignIcon, User } from "lucide-react";
import { Navigate, Outlet, useLocation } from "react-router";

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  if (pathname === "/admin") {
    return <Navigate to="/admin/users" replace />;
  }

  // Menu items.
  const items = [
    {
      title: "Users",
      url: "/admin/users",
      icon: User,
    },
    {
      title: "Rides",
      url: "/admin/rides",
      icon: CarFront,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: DollarSignIcon,
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
