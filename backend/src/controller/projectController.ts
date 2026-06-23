import { Request, Response } from 'express';
import projectService from '../services/projectService';

export const getProjects = async (req: Request, res: Response) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch projects' });
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("id parameter not given");
        }
        const project = await projectService.getProjectById(id as string);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch projects', error });
    }
};

export const addProject = async (req: Request, res: Response) => {
    try {
        const newProject = await projectService.createProject(req.body);
        res.status(201).json({ success: true, data: newProject });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create project' });
    }
};

export const editProject = async (req: Request, res: Response) => {
    try {
        const updatedProject = await projectService.updateProject(req.params.id as string, req.body);
        res.status(200).json({ success: true, data: updatedProject });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update project' + error });
    }
};

export const removeProject = async (req: Request, res: Response) => {
    try {
        await projectService.deleteProject(req.params.id as string);
        res.status(200).json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete project ' });
    }
};
