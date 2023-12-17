import { Router } from 'express';
import { createUser, getCounters, increaseCounter } from './controllers';

const router: Router = Router();

router.post('/login', createUser);
router.get('/counters', getCounters);
router.put('/counters/:username', increaseCounter);

export default router
