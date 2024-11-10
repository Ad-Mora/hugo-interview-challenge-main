import { Router } from 'express';

import applicationRoutes from './application';

const routes = Router();

routes.use('/api/applications', applicationRoutes);

export default routes;
