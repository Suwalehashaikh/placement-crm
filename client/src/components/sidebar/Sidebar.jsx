import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Briefcase,
  FileText,
  UserCheck,
  UserCircle,
  LogOut,
  ChevronRight,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },

    ...(user?.role === "admin" || user?.role === "counseller"
      ? [
          {
            title: "Students",
            path: "/students",
            icon: Users,
          },
          {
            title: "Resumes",
            path: "/resumes",
            icon: FileText,
          },
          {
            title: "Alumni",
            path: "/alumni",
            icon: UserCheck,
          },
        ]
      : []),

    ...(user?.role === "admin"
      ? [
          {
            title: "Courses",
            path: "/courses",
            icon: GraduationCap,
          },
        ]
      : []),

    ...(user?.role === "admin" || user?.role === "hr"
      ? [
          {
            title: "Placements",
            path: "/placements",
            icon: Briefcase,
          },
        ]
      : []),

    {
      title: "Profile",
      path: "/profile",
      icon: UserCircle,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          sidebarOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky
    top-0 left-0
    z-50
    h-screen
    w-72
    bg-white
    border-r
    border-slate-200
    flex
    flex-col
    overflow-hidden
    transition-transform
    duration-300
    ease-in-out ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-7">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 text-2xl font-bold text-white shadow-xl">
              P
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Placement CRM
              </h2>

              <p className="text-sm text-slate-500">
                Management System
              </p>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden rounded-xl p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Main Menu
          </p>

          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                        : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-4">
                        <Icon
                          size={20}
                          className={
                            isActive
                              ? "text-white"
                              : "group-hover:text-indigo-600"
                          }
                        />

                        <span className="font-medium">
                          {item.title}
                        </span>
                      </div>

                      <ChevronRight
                        size={16}
                        className={`transition-all ${
                          isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom User Card */}
        

            <button
              onClick={handleLogout}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 py-3 font-medium text-red-600 transition-all hover:bg-red-100"
            >
              <LogOut size={18} />
              Logout
            </button>
         
      </aside>
    </>
  );
};

export default Sidebar;