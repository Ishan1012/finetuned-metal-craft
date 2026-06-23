import projectRepository from '../repository/projectRepository';

const projectService = {
    getAllProjects: async () => {
        return await projectRepository.findAll();
    },

    getProjectById: async (id: string) => {
        return await projectRepository.findById(id);
    },

    createProject: async (projectData: any) => {
        return await projectRepository.create(projectData);
    },

    updateProject: async (id: string, updateData: any) => {
        return await projectRepository.updateById(id, updateData);
    },

    deleteProject: async (id: string) => {
        return await projectRepository.deleteById(id);
    }
};

export default projectService;