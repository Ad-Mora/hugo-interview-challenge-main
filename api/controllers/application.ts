import type { Request, Response } from 'express';
import ValidationError from '../errors';
import {
    createApplication,
    getApplication,
    updateApplication,
    parseApplication,
    parseId,
} from '../application-service';

export async function createApplicationController(req: Request, res: Response) {
    try {
        const parsedAppInput = parseApplication(req.body);
        const app = await createApplication(parsedAppInput);
        return res.json({
            route: `/applications/${app.id}`,
        });
    } catch (e) {
        console.error(`Error creating application: ${e}`);
        if (e instanceof ValidationError) {
            return res
                .status(400)
                .json({ message: 'Error creating application - validation error.' });
        } else {
            return res.status(500).json({
                message: `Error creating application.`,
            });
        }
    }
}

export async function getApplicationController(req: Request, res: Response) {
    try {
        const appId = parseId(req.params.id);
        const application = await getApplication(appId);
        if (application === null) {
            return res.status(404).json({ message: 'Application not found.' });
        }
        return res.json({ data: application });
    } catch (e) {
        console.error(`Error getting application: ${e}`);
        if (e instanceof ValidationError) {
            return res
                .status(400)
                .json({ message: 'Error getting application - validation error.' });
        } else {
            return res.status(500).json({
                message: `Error getting application.`,
            });
        }
    }
}

export async function updateApplicationController(req: Request, res: Response) {
    try {
        const appId = parseId(req.params.id);
        const parsedApplicationInput = parseApplication(req.body);
        await updateApplication(appId, parsedApplicationInput);
        return res.json({ message: 'Successfully updated application!' });
    } catch (e) {
        console.error(`Error updating application: ${e}`);
        if (e instanceof ValidationError) {
            return res
                .status(400)
                .json({ message: 'Error updating application - validation error.' });
        } else {
            return res.status(500).json({
                message: `Error updating application.`,
            });
        }
    }
}

export async function submitApplicationController(req: Request, res: Response) {
    try {
        const appId = parseId(req.params.id);
        const parsedApplicationInput = parseApplication(req.body, true);
        await updateApplication(appId, parsedApplicationInput);
        return res.json({
            data: Math.floor(Math.random() * 100),
        });
    } catch (e) {
        console.error(`Error submitting application: ${e}`);
        if (e instanceof ValidationError) {
            return res
                .status(400)
                .json({ message: 'Error submitting application - validation error.' });
        } else {
            return res.status(500).json({
                message: `Error submitting application.`,
            });
        }
    }
}
