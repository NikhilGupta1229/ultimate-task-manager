import { useEffect, useState } from "react";
import API from "../api";
import { useLocation, Link } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [projectId, setProjectId] = useState("");
  const [dueDate, setDueDate] = useState("");

  const role = localStorage.getItem("role");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentProjectId = queryParams.get("projectId");

  useEffect(() => {
    fetchTasks();
    if (role === "admin") {
      fetchUsers();
      fetchProjects();
    }
  }, [currentProjectId]);

  async function fetchTasks() {
    try {
      const url = currentProjectId ? `/tasks?projectId=${currentProjectId}` : `/tasks`;
      const res = await API.get(url);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchUsers() {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchProjects() {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function addTask() {
    if (!title || !assignedTo || !projectId || !dueDate) {
      return alert("Please fill all fields (Title, Assignee, Project, Due Date)");
    }

    try {
      await API.post("/tasks", {
        title,
        status: "pending",
        assignedTo,
        projectId,
        dueDate
      });

      setTitle("");
      setAssignedTo("");
      setProjectId("");
      setDueDate("");
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to create task");
    }
  }

  async function markDone(id) {
    try {
      await API.put(`/tasks/${id}`, { status: "done" });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  }

  const isOverdue = (dateString, status) => {
    if (!dateString || status === 'done') return false;
    return new Date() > new Date(dateString);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            {currentProjectId ? "Project Tasks" : "All Tasks"}
          </h1>
          <p className="text-slate-400 text-sm">Manage and track project tasks</p>
        </div>
        
        {currentProjectId && (
          <Link to="/projects" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors border border-slate-700 text-sm">
            ← Back to Projects
          </Link>
        )}
      </div>

      {/* 👑 ADMIN PANEL */}
      {role === "admin" && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Assign New Task
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="relative">
              <select
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="">Select Assignee</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.email}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="date"
              className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <button 
              className="py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
        </div>
      )}

      {/* 📋 TASK LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-slate-800/30 rounded-2xl border border-slate-800 border-dashed">
            <p className="text-slate-400 font-medium text-lg">No tasks found</p>
          </div>
        ) : (
          tasks.map((t) => (
            <div key={t._id} className={`bg-slate-800/50 backdrop-blur-sm border ${isOverdue(t.dueDate, t.status) ? 'border-red-500/50 shadow-red-500/10' : 'border-slate-700/50 hover:border-indigo-500/50'} rounded-2xl p-6 flex flex-col justify-between group transition-colors shadow-lg shadow-black/10`}>
              <div>
                <div className="flex justify-between items-start mb-4 gap-2">
                  <h3 className="text-lg font-semibold text-white leading-tight">{t.title}</h3>
                  <div className="flex flex-col gap-1 items-end">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap border ${
                      t.status === "done" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {t.status === "done" ? "Completed" : "Pending"}
                    </span>
                    {isOverdue(t.dueDate, t.status) && (
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap border bg-red-500/10 text-red-400 border-red-500/20 animate-pulse">
                        Overdue
                      </span>
                    )}
                  </div>
                </div>
                
                {t.dueDate && (
                  <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Due: {new Date(t.dueDate).toLocaleDateString()}
                  </p>
                )}

                {role === "admin" && t.assignedTo && (
                   <p className="text-sm text-slate-400 mb-4 flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                     {users.find(u => u._id === t.assignedTo)?.email || 'Unknown User'}
                   </p>
                )}
              </div>

              {t.status !== "done" && (
                <button 
                  className="w-full mt-4 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-medium rounded-xl border border-indigo-500/20 transition-all flex items-center justify-center gap-2 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 shadow-sm"
                  onClick={() => markDone(t._id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Done
                </button>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}