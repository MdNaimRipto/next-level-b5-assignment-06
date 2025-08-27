import Homepage from "@/pages/Homepage";
import { createBrowserRouter } from "react-router";
import Features from "@/pages/Features";
import App from "@/App";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Verify from "@/pages/auth/Verify";
import Rides from "@/pages/Rides";
import AuthLayout from "@/layouts/AuthLayout";
import UserLayout from "@/layouts/UserLayout";
import Account from "@/pages/user/Account";
import MyRides from "@/pages/user/MyRides";
import AdminLayout from "@/layouts/AdminLayout";
import Users from "@/pages/admin/Users";
import AllRides from "@/pages/admin/AllRides";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Homepage,
        index: true,
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: FAQ,
        path: "faq",
      },
      {
        Component: Rides,
        path: "rides",
      },
    ],
  },
  {
    Component: AuthLayout,
    path: "/auth",
    children: [
      {
        Component: Login,
        path: "login",
      },
      {
        Component: Register,
        path: "register",
      },
      {
        Component: Verify,
        path: "verify",
      },
    ],
  },
  {
    Component: UserLayout,
    path: "/user",
    children: [
      {
        Component: Account,
        path: "account",
      },
      {
        Component: MyRides,
        path: "myRides",
      },
    ],
  },
  {
    Component: AdminLayout,
    path: "/admin",
    children: [
      {
        Component: Users,
        path: "users",
      },
      {
        Component: AllRides,
        path: "rides",
      },
    ],
  },
]);
