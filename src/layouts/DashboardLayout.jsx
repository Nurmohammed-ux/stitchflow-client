import { Outlet } from "react-router";
import Sidebar from "../pages/Dashboard/Sidebar/Sidebar";


const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8faf8] container mx-auto text-secondary">
      <Sidebar />

      <main className="min-h-screen lg:ml-25">
        <div className="px-5 py-6 md:px-8 lg:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;