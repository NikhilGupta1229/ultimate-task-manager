import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  function logout() {
    localStorage.clear();
    nav("/");
  }

  // Don't show navbar on login/register pages
  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
              TM
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              TaskMaster
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {role === "admin" && (
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === "/dashboard"
                    ? "text-indigo-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/tasks"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/tasks"
                  ? "text-indigo-400"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Tasks
            </Link>
            <Link
              to="/projects"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/projects"
                  ? "text-indigo-400"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Projects
            </Link>
          </div>

          {/* User & Actions */}
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
              role === "admin" 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
            }`}>
              {role === "admin" ? "Admin" : "Member"}
            </span>

            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all border border-slate-700 shadow-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
