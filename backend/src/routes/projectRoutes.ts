import express from 'express';
import { getProjects, addProject, editProject, removeProject, getProjectById } from '../controller/projectController';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', addProject);
router.put('/:id', editProject);
router.delete('/:id', removeProject);

export default router;