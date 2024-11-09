import { Router } from 'express';

import {
    createApplicationController,
    getApplicationController,
    updateApplicationController,
    submitApplicationController,
} from '../controllers/application';

const routes = Router();

routes.post('/', createApplicationController);
routes.get('/:id', getApplicationController);
routes.put('/:id', updateApplicationController);
routes.post('/:id/submit', submitApplicationController);

export default routes;
