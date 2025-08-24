import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/router.ts";
import { RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import AuthContext from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthContext>
        <>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </>
      </AuthContext>
    </Provider>
  </StrictMode>
);
