import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { toast } from "sonner";
import { Project, projectAPI } from "../../lib/api-services";

declare global {
  interface Window {
    cloudinary: any;
  }
}

// Importing or defining your options
export const categories = ["All", "Railings", "Name Plates", "Gates", "Grills", "Elevation", "Custom"];
export const materials = ["All", "Stainless Steel", "Mild Steel", "Aluminium", "Brass", "Copper"];
export const projectTypes = ["All", "Residential", "Commercial", "Corporate"];

const EMPTY_PRODUCT: Omit<Project, "_id"> = {
  src: "",
  alt: "",
  title: "",
  category: "Custom",
  material: "Stainless Steel",
  projectType: "Residential",
  location: "",
};

export default function ManageProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formProject, setFormProject] = useState<Project | Omit<Project, "_id"> | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const fetchedProjects = await projectAPI.getProjects();
      setProjects(fetchedProjects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500 text-lg">Loading projects...</span>
      </div>
    );
  }

  const openCloudinaryWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFiles: 1,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Upload successful! URL: ", result.info.secure_url);
          if (formProject) {
            setFormProject({ ...formProject, src: result.info.secure_url });
          }
        }
      }
    );

    widget.open();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await projectAPI.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProject) return;
    if (saving) return;

    try {
      setSaving(true);

      if ("_id" in formProject) {
        const updatedProject = await projectAPI.updateProject(
          formProject._id,
          formProject as Project
        );
        setProjects((prev) =>
          prev.map((p) => (p._id === formProject._id ? updatedProject : p))
        );
        toast.success('Project updated successfully');
      } else {
        const newProject = await projectAPI.createProject(
          formProject as Omit<Project, "_id">
        );
        setProjects((prev) => [newProject, ...prev]);
        toast.success('Project created successfully');
      }

      setFormProject(null);
    } catch (error) {
      console.error('Failed to save project:', error);
      toast.error('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Button className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl" onClick={() => setFormProject(EMPTY_PRODUCT)}>
          Add New Project
        </Button>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] border-none p-6 overflow-hidden">
        <Table>
          <TableHeader>
            {/* FIXED: Updated table headers to match Project fields */}
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                {/* FIXED: Changed project.image -> project.src and project.name -> project.title */}
                <TableCell>
                  <img src={project.src} alt={project.title} className="w-10 h-10 rounded-md object-cover" />
                </TableCell>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell>{project.material}</TableCell>
                <TableCell>{project.projectType}</TableCell>
                <TableCell className="text-right">
                  <Button className="bg-[#ffffff] hover:bg-[#E4A143] hover:text-white rounded-xl mr-3" variant="outline" size="sm" onClick={() => setFormProject({ ...project })}>
                    Edit
                  </Button>
                  <Button className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl" variant="destructive" size="sm" onClick={() => handleDelete(project._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {formProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {"_id" in formProject ? "Edit Project" : "Add New Project"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              {/* TITLE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={formProject.title}
                  onChange={(e) => setFormProject({ ...formProject, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  placeholder="e.g. Modern Brass Nameplate"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* CATEGORY */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formProject.category}
                    onChange={(e) => setFormProject({ ...formProject, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  >
                    {categories.filter(c => c !== "All").map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                {/* PROJECT TYPE */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                  <select
                    value={formProject.projectType}
                    onChange={(e) => setFormProject({ ...formProject, projectType: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  >
                    {projectTypes.filter(t => t !== "All").map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* MATERIAL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                  <select
                    value={formProject.material}
                    onChange={(e) => setFormProject({ ...formProject, material: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  >
                    {materials.filter(m => m !== "All").map(mat => (
                      <option key={mat} value={mat}>{mat}</option>
                    ))}
                  </select>
                </div>

                {/* LOCATION */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formProject.location}
                    onChange={(e) => setFormProject({ ...formProject, location: e.target.value })}
                    placeholder="e.g. Mumbai, India"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                <div className="flex items-center gap-4">
                  {formProject.src && (
                    <img src={formProject.src} alt="Preview" className="w-16 h-16 object-cover rounded border border-gray-200 shadow-sm" />
                  )}

                  <Button
                    type="button"
                    className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl"
                    variant="outline"
                    onClick={openCloudinaryWidget}
                  >
                    Upload Image
                  </Button>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl" onClick={() => setFormProject(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#E4A143] hover:bg-[#D29D5B] text-white rounded-xl">
                  {"_id" in formProject ? "Update Project" : "Create Project"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}