import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  const role = localStorage.getItem("role");

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-slate-400 text-sm">Welcome back! Here's your overview.</p>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-2xl" />
          <h3 className="text-slate-400 font-medium mb-2">Total Tasks</h3>
          <p className="text-4xl font-bold text-white tracking-tight">
            {data.total}
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-l-2xl" />
          <h3 className="text-slate-400 font-medium mb-2">Completed</h3>
          <p className="text-4xl font-bold text-white tracking-tight">
            {data.completed}
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/50 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-l-2xl" />
          <h3 className="text-slate-400 font-medium mb-2">Pending</h3>
          <p className="text-4xl font-bold text-white tracking-tight">
            {data.pending}
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Actions
        </h3>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/tasks"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5"
          >
            Go to Tasks
          </Link>

          <Link
            to="/projects"
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl border border-slate-600 transition-all transform hover:-translate-y-0.5"
          >
            View Projects
          </Link>
        </div>
      </div>

    </div>
  );
}