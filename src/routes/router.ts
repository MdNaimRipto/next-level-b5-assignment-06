import Homepage from "@/pages/Homepage";
import { createBrowserRouter } from "react-router";
import Features from "@/pages/Features";
import App from "@/App";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

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
    ],
  },
  {
    Component: Login,
    path: "/auth/login",
  },
  {
    Component: Register,
    path: "/auth/register",
  },
]);
