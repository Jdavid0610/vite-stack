import { NavLink } from "react-router-dom";
import routes from "@/router/routes";
import useAuth from "@/hooks/auth/useAuth";

const Sidebar = () => {
  const { logout } = useAuth();
  const navRoutes = routes.filter((r) => r.routeEnabled);

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col p-4">
      <div className="text-xl font-bold mb-8 px-2">App</div>

      <nav className="flex flex-col gap-1 flex-1">
        {navRoutes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {route.icon && <route.icon size={18} />}
            <span>{route.name}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mt-4 text-gray-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left"
      >
        Sign out
      </button>
    </aside>
  );
};

export default Sidebar;
