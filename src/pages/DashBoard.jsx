import React, { useState, useEffect } from "react";
import DashboardNavbar from "../components/DashBoardNavBar";
import ProjectCard from "../components/ProjectCard";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    manager: "",
    deadline: "",
    priority: "Low",
    tags: [],
    description: "",
    image: "",
  });
  const [showModal, setShowModal] = useState(false);

  // Sample projects
  useEffect(() => {
    const sampleProjects = [
      {
        id: 1,
        name: "Website Redesign",
        manager: "Alice",
        deadline: "2025-09-20",
        priority: "High",
        tags: ["UI", "UX", "Frontend"],
        description: "Redesign the company website for better conversion.",
        image: "https://via.placeholder.com/300x150",
      },
      {
        id: 2,
        name: "Mobile App MVP",
        manager: "Bob",
        deadline: "2025-09-30",
        priority: "Medium",
        tags: ["React Native", "Backend"],
        description: "Develop a minimal mobile app to showcase MVP.",
        image: "https://via.placeholder.com/300x150",
      },
      {
        id: 3,
        name: "SEO Optimization",
        manager: "Carol",
        deadline: "2025-10-05",
        priority: "Low",
        tags: ["SEO", "Marketing"],
        description: "Improve search engine rankings for main pages.",
        image: "https://via.placeholder.com/300x150",
      },
    ];
    setProjects(sampleProjects);
  }, []);

  const saveProjects = (updatedProjects) => {
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  const handleAddProject = () => {
    const project = { ...newProject, id: Date.now() };
    saveProjects([...projects, project]);
    setNewProject({
      name: "",
      manager: "",
      deadline: "",
      priority: "Low",
      tags: [],
      description: "",
      image: "",
    });
    setShowModal(false);
  };

  const handleUpdateProject = (id, updatedProject) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...updatedProject, id } : p
    );
    saveProjects(updated);
  };

  const handleDeleteProject = (id) => {
    const filtered = projects.filter((p) => p.id !== id);
    saveProjects(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Optional: glowing moving dots / particles */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(255,255,255,0.05),_transparent_25%),radial-gradient(circle_at_80%_70%,_rgba(255,255,255,0.05),_transparent_25%)] animate-pulse"></div>
      </div>

      <div className="relative z-10 text-gray-100">
        <DashboardNavbar />

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-wide text-white drop-shadow-lg">
              Project Dashboard
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition transform hover:scale-105"
            >
              Add Project
            </button>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onUpdate={handleUpdateProject}
                onDelete={handleDeleteProject}
                onSelect={() => {}}
                isSelected={false}
                className="bg-gray-800 shadow-xl rounded-2xl transition hover:shadow-2xl hover:scale-105"
              />
            ))}
          </div>
        </div>

        {/* Add Project Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-gray-100 p-6 rounded-3xl w-full max-w-lg shadow-2xl">
              <h2 className="text-2xl font-bold mb-4 text-white">Add New Project</h2>

              <input
                type="text"
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-gray-600 mb-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Project Manager"
                value={newProject.manager}
                onChange={(e) =>
                  setNewProject({ ...newProject, manager: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-gray-600 mb-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="date"
                value={newProject.deadline}
                onChange={(e) =>
                  setNewProject({ ...newProject, deadline: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-gray-600 mb-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={newProject.priority}
                onChange={(e) =>
                  setNewProject({ ...newProject, priority: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-gray-600 mb-3 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newProject.tags.join(",")}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    tags: e.target.value.split(","),
                  })
                }
                className="w-full p-3 rounded-xl border border-gray-600 mb-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                placeholder="Description"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-gray-600 mb-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newProject.image}
                onChange={(e) =>
                  setNewProject({ ...newProject, image: e.target.value })
                }
                className="w-full p-3 rounded-xl border border-gray-600 mb-3 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProject}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

