import type { Request, Response } from 'express';
import ValidationError from '../errors';
import {
    createApplication,
    getApplication,
    updateApplication,
    parseApplication,
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
        return getApplication(parseInt(req.params.id));
    } catch (e) {
        console.error(`Error getting application: ${e}`);
        return res.status(500).json({
            message: `Error getting application.`,
        });
    }
}

export async function updateApplicationController(req: Request, res: Response) {
    try {
        const parsedApplicationInput = parseApplication(req.body, true);
        return updateApplication(parsedApplicationInput);
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
        const parsedApplicationInput = parseApplication(req.body, true, true);
        await updateApplication(parsedApplicationInput);
        return Math.floor(Math.random() * 100);
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
