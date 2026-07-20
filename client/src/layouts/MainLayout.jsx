import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-slate-100">

      <div className="flex h-full">

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex flex-1 flex-col overflow-hidden">

          <Header
            setSidebarOpen={setSidebarOpen}
          />

          <main className="flex-1 overflow-y-auto">

            <div className="mx-auto w-full max-w-[1800px] p-4 md:p-6 lg:p-8">

              <Outlet />

            </div>

          </main>

        </div>

      </div>

    </div>
  );
};

export default MainLayout;