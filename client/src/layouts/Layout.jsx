import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Desktop Sidebar */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}

      <div className="flex flex-1 flex-col">

        <Header
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">

          <Outlet />

        </main>

      </div>

    </div>
  );
};

export default Layout;