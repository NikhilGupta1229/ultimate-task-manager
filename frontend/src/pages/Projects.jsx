import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchProjects();
    if (role === "admin") fetchUsers();
  }, [role]);

  async function fetchProjects() {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
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

  async function createProject() {
    if (!name || !description || !dueDate) return alert("Fill all required fields");
    try {
      await API.post("/projects", {
        name,
        description,
        dueDate,
        assignedTo
      });
      setName("");
      setDescription("");
      setDueDate("");
      setAssignedTo([]);
      fetchProjects();
    } catch (err) {
      console.error("Failed to create project", err);
    }
  }

  async function updateStatus(id, newStatus) {
    try {
      await API.put(`/projects/${id}`, { status: newStatus });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  }

  const toggleUser = (userId) => {
    setAssignedTo(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const isOverdue = (dateString, status) => {
    if (!dateString || status === 'completed') return false;
    return new Date() > new Date(dateString);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Projects</h1>
          <p className="text-slate-400 text-sm">Explore and manage your active projects</p>
        </div>
      </div>

      {/* 👑 ADMIN PANEL */}
      {role === "admin" && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8 shadow-lg relative">
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Project
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            <input
              className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Project Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="date"
              className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <div className="relative">
              <button 
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 hover:border-slate-600 rounded-xl text-white text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 h-[50px] transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="truncate flex items-center gap-2">
                  {assignedTo.length === 0 ? (
                    <span className="text-slate-400">Select Members...</span>
                  ) : (
                    <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-sm font-medium border border-indigo-500/30">
                      {assignedTo.length} Selected
                    </span>
                  )}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-slate-800/95 backdrop-blur-xl border border-slate-600 rounded-xl shadow-2xl max-h-64 overflow-y-auto py-2">
                  {users.length === 0 ? (
                    <div className="px-4 py-3 text-slate-400 text-sm text-center">No members found</div>
                  ) : (
                    users.map(u => (
                      <div 
                        key={u._id} 
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 cursor-pointer transition-colors group"
                        onClick={() => toggleUser(u._id)}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${assignedTo.includes(u._id) ? 'bg-indigo-500 border-indigo-500 scale-110' : 'border-slate-500 group-hover:border-indigo-400'}`}>
                          {assignedTo.includes(u._id) && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{u.email}</p>
                          <p className="text-xs text-slate-400 capitalize truncate">{u.role}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <button 
              className="md:col-span-2 lg:col-span-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              onClick={createProject}
            >
              Create Project
            </button>
          </div>
        </div>
      )}

      {/* PROJECTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
           <div className="col-span-full py-12 text-center bg-slate-800/30 rounded-2xl border border-slate-800 border-dashed">
             <p className="text-slate-400 font-medium text-lg">No projects found</p>
           </div>
        ) : (
          projects.map((p) => (
            <div 
              key={p._id} 
              className={`bg-slate-800/50 backdrop-blur-sm border ${isOverdue(p.dueDate, p.status) ? 'border-red-500/50 shadow-red-500/10' : 'border-slate-700/50 hover:border-indigo-500/50'} rounded-2xl p-6 flex flex-col justify-between group transition-colors shadow-lg shadow-black/10 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              
              <div>
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-xl font-semibold text-white leading-tight">{p.name}</h3>
                  <div className="flex flex-col gap-1 items-end">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap border ${
                      p.status === "completed" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : p.status === "in progress"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-slate-500/10 text-slate-300 border-slate-500/20"
                    }`}>
                      {p.status || "todo"}
                    </span>
                    {isOverdue(p.dueDate, p.status) && (
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap border bg-red-500/10 text-red-400 border-red-500/20 animate-pulse">
                        Overdue
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {p.description}
                </p>

                {p.dueDate && (
                  <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Due: {new Date(p.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                <select
                  className="bg-slate-900/50 border border-slate-700 rounded-lg text-xs text-slate-300 px-2 py-1.5 focus:outline-none focus:border-indigo-500"
                  value={p.status || 'todo'}
                  onChange={(e) => updateStatus(p._id, e.target.value)}
                >
                  <option value="todo">To Do</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <Link to={`/tasks?projectId=${p._id}`} className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  View Tasks
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}