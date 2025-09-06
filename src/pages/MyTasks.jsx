import React, { useState, useEffect } from "react";
import DashboardNavbar from "../components/DashBoardNavBar";
import { AiFillEdit } from "react-icons/ai";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null); // Task currently being edited
  const [showModal, setShowModal] = useState(false);

  // Sample tasks
  useEffect(() => {
    setTasks([
      { id: 1, name: "Design Homepage", status: "To Do", deadline: "2025-09-10" },
      { id: 2, name: "Backend API Integration", status: "In Progress", deadline: "2025-09-15" },
      { id: 3, name: "Write Unit Tests", status: "Done", deadline: "2025-09-05" },
      { id: 4, name: "UI Component Library", status: "To Do", deadline: "2025-09-12" },
      { id: 5, name: "Deploy MVP", status: "In Progress", deadline: "2025-09-20" },
    ]);
  }, []);

  const statuses = ["To Do", "In Progress", "Done"];
  const getTasksByStatus = (status) => tasks.filter((task) => task.status === status);

  const openEditModal = (task) => {
    setEditTask({ ...task });
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    setTasks(tasks.map((t) => (t.id === editTask.id ? editTask : t)));
    setShowModal(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Shiny dots background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(255,255,255,0.05),_transparent_25%),radial-gradient(circle_at_80%_70%,_rgba(255,255,255,0.05),_transparent_25%)] animate-pulse"></div>
      </div>

      <DashboardNavbar />

      <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-400 drop-shadow-lg">My Task Board</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statuses.map((status) => (
            <div key={status} className="bg-gray-800/30 rounded-2xl p-4 shadow-lg backdrop-blur-md">
              <h2 className="text-xl font-semibold mb-4 text-indigo-300">{status}</h2>
              <div className="flex flex-col gap-3">
                {getTasksByStatus(status).map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-gray-800/50 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer flex justify-between items-start"
                  >
                    <div>
                      <h3 className="font-bold text-gray-100">{task.name}</h3>
                      <p className="text-gray-400 text-sm">Deadline: {task.deadline}</p>
                    </div>
                    <button
                      onClick={() => openEditModal(task)}
                      className="text-green-400 hover:text-green-500 transition"
                    >
                      <AiFillEdit size={20} />
                    </button>
                  </div>
                ))}
                {getTasksByStatus(status).length === 0 && (
                  <p className="text-gray-500 text-sm">No tasks</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Task Modal */}
      {showModal && editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-3xl w-full max-w-lg shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-4 text-indigo-400">Edit Task</h2>

            <input
              type="text"
              placeholder="Task Name"
              value={editTask.name}
              onChange={(e) => setEditTask({ ...editTask, name: e.target.value })}
              className="w-full p-3 rounded-xl border mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
            />

            <select
              value={editTask.status}
              onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
              className="w-full p-3 rounded-xl border mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 border-gray-600 text-gray-100"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <input
              type="date"
              value={editTask.deadline}
              onChange={(e) => setEditTask({ ...editTask, deadline: e.target.value })}
              className="w-full p-3 rounded-xl border mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-700 border-gray-600 text-gray-100"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
