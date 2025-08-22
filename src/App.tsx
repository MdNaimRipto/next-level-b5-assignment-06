import { Outlet } from "react-router";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default App;
