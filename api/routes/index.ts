import { Router } from 'express';

import applicationRoutes from './application';

const routes = Router();

routes.use('/api/appliactions', applicationRoutes);

export default routes;
