import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300";

  const activeClass =
    "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg";

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-yellow-500 to-yellow-700 text-white p-6 shadow-2xl">
      
      {/* TITLE */}
      <h2 className="text-2xl font-extrabold mb-12 text-center tracking-wider text-[#4E342E] bg-white/80 py-2 rounded-xl shadow-md">
        ShopVerse Admin
      </h2>

      <nav className="space-y-4">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? activeClass
                : "hover:bg-yellow-600/60 hover:translate-x-1"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? activeClass
                : "hover:bg-yellow-600/60 hover:translate-x-1"
            }`
          }
        >
          <Users size={20} />
          Users
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? activeClass
                : "hover:bg-yellow-600/60 hover:translate-x-1"
            }`
          }
        >
          <Package size={20} />
          Products
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive
                ? activeClass
                : "hover:bg-yellow-600/60 hover:translate-x-1"
            }`
          }
        >
          <ShoppingBag size={20} />
          Orders
        </NavLink>

        {/* ✅ SIGN IN BUTTON (Replaced Shop) */}
        <button
          onClick={() => navigate("/login")}
          className={`${linkClass} hover:bg-yellow-600/60 hover:translate-x-1 w-full text-left`}
        >
          Sign In
        </button>

        {/* LOGOUT BUTTON */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition shadow-md font-semibold mt-4"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;