import {
  Bell,
  Search,
  CalendarDays,
  ChevronDown,
  Menu,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Header = ({ setSidebarOpen }) => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-xl">

      <div className="flex items-center justify-between px-4 py-4 md:px-6 xl:px-8">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          {/* Hamburger */}

          <button
            onClick={() => setSidebarOpen(true)}
            className="flex lg:hidden h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
          >
            <Menu size={22} />
          </button>

          {/* Welcome */}

          <div>

            <h1 className="text-xl font-bold text-slate-900 md:text-3xl">

              Welcome,

              <span className="ml-2 text-indigo-600">
                {user?.name?.split(" ")[0] || "Admin"}
              </span>

              👋

            </h1>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">

              <CalendarDays size={15} />

              <span>{today}</span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-3 md:gap-4">

          {/* Search */}

          <div className="hidden xl:flex w-80 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-indigo-500 focus-within:bg-white">

            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />

          </div>

          {/* Notification */}

          <button
            className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-sm
            transition-all
            hover:-translate-y-0.5
            hover:shadow-md
            "
          >

            <Bell
              size={19}
              className="text-slate-600"
            />

            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>

          </button>

          {/* Profile */}

          <button
            className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-3
            py-2
            shadow-sm
            transition-all
            hover:-translate-y-0.5
            hover:shadow-md
            "
          >

            <img
              src={
                user?.profile ||
                `https://ui-avatars.com/api/?background=4f46e5&color=fff&name=${user?.name}`
              }
              alt="profile"
              className="h-11 w-11 rounded-xl object-cover"
            />

            <div className="hidden md:block text-left">

              <h3 className="font-semibold leading-none text-slate-900">
                {user?.name || "User"}
              </h3>

              <p className="mt-1 text-xs capitalize text-slate-500">
                {user?.role || "Employee"}
              </p>

            </div>

            <ChevronDown
              size={18}
              className="hidden text-slate-400 md:block"
            />

          </button>

        </div>

      </div>

    </header>
  );
};

export default Header;