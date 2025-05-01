import { Router } from 'express';
import membersRouter from './members/members.router.js';

const router = Router();

router.use('/members', membersRouter);

export default router;