import { Project } from '../model/Projects';

const projectRepository = {
    findAll: async () => {
        return await Project.find().sort({ createdAt: -1 });
    },

    findById: async (id: string) => {
        return await Project.findById(id);
    },

    create: async (projectData: any) => {
        return await Project.create(projectData);
    },

    updateById: async (id: string, updateData: any) => {
        return await Project.findByIdAndUpdate(id, updateData, { new: true });
    },

    deleteById: async (id: string) => {
        return await Project.findByIdAndDelete(id);
    }
};

export default projectRepository;