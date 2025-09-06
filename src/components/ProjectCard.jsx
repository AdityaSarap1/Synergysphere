import React, { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function ProjectCard({ project, onSelect, onUpdate, onDelete, isSelected }) {
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState({ ...project });

  const handleSaveEdit = () => {
    onUpdate(project.id, editProject);
    setShowModal(false);
  };

  return (
    <>
      {/* Card */}
      <div
        className={`cursor-pointer p-4 rounded-2xl shadow-lg border transition transform hover:scale-105 hover:shadow-2xl
          ${isSelected ? "border-indigo-500 bg-indigo-100 dark:bg-indigo-900" : "border-gray-300 dark:border-gray-600 bg-white/20 dark:bg-gray-800"}`}
        onClick={() => onSelect && onSelect(project.id)}
      >
        <img
          src={project.image || "https://via.placeholder.com/300x150"}
          alt="Project"
          className="rounded-xl w-full h-32 object-cover mb-3"
        />
        <h2 className="text-lg font-bold mb-1">{project.name}</h2>
        <p className="text-gray-500 dark:text-gray-300 text-sm mb-1">{project.description}</p>
        <div className="flex justify-between items-center text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400 font-medium">Manager: {project.manager}</span>
          <span className="text-gray-600 dark:text-gray-400 font-medium">{project.priority}</span>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-300 mb-1">
          <span>Deadline: {project.deadline}</span>
          <span className="flex gap-1">
            {project.tags.map((tag, i) => (
              <span key={i} className="bg-indigo-500 text-white px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
            className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm flex items-center gap-1"
          >
            <AiFillEdit /> Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm flex items-center gap-1"
          >
            <AiFillDelete /> Delete
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl w-full max-w-lg relative shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Edit Project</h2>

            <input
              type="text"
              placeholder="Project Name"
              value={editProject.name}
              onChange={(e) => setEditProject({ ...editProject, name: e.target.value })}
              className="w-full p-3 rounded-xl border mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/20 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Project Manager"
              value={editProject.manager}
              onChange={(e) => setEditProject({ ...editProject, manager: e.target.value })}
              className="w-full p-3 rounded-xl border mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/20 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
            />
            <input
              type="date"
              value={editProject.deadline}
              onChange={(e) => setEditProject({ ...editProject, deadline: e.target.value })}
              className="w-full p-3 rounded-xl border mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/20 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            <select
              value={editProject.priority}
              onChange={(e) => setEditProject({ ...editProject, priority: e.target.value })}
              className="w-full p-3 rounded-xl border mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/20 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={editProject.tags.join(",")}
              onChange={(e) => setEditProject({ ...editProject, tags: e.target.value.split(",") })}
              className="w-full p-3 rounded-xl border mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/20 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
            />
            <textarea
              placeholder="Description"
              value={editProject.description}
              onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
              className="w-full p-3 rounded-xl border mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/20 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={editProject.image}
              onChange={(e) => setEditProject({ ...editProject, image: e.target.value })}
              className="w-full p-3 rounded-xl border mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/20 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-xl"
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
    </>
  );
}
