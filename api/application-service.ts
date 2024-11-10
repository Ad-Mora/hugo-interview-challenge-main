import db from './db';
import { Prisma, Application as DbApplication } from '@prisma/client';
import { Application, Vehicle, IncompleteApplication } from '../types';
import { ApplicationSchema } from '../zod-schemas';
import ValidationError from './errors';

// transform the data from the DTO format to the DB format
function convertAppToDbFormat(data: IncompleteApplication) {
    const vehicles =
        data.vehicles === undefined ? undefined : JSON.stringify(data.vehicles);
    return { ...data, vehicles };
}

// transform the DB data into the DTO format
function convertAppFromDbFormat(application: DbApplication) {
    const vehicles =
        application.vehicles === null
            ? null
            : (JSON.parse(application.vehicles) as [Vehicle]);
    return { ...application, vehicles };
}

async function createApplication(data: IncompleteApplication) {
    const createInput: Prisma.ApplicationCreateInput = convertAppToDbFormat(data);
    return db.application.create({ data: createInput });
}

async function updateApplication(id: number, data: IncompleteApplication) {
    const updateInput: Prisma.ApplicationUpdateInput = convertAppToDbFormat(data);
    return db.application.update({ where: { id }, data: updateInput });
}

// return in the DTO format
async function getApplication(id: number): Promise<IncompleteApplication | null> {
    const app = await db.application.findUnique({ where: { id } });

    if (app === null) return app;
    return convertAppFromDbFormat(app);
}

// use zod schemas to parse and validate the application data provided from the
// request body
function parseApplication(reqBody: object, requireId = false, fullSchema = false) {
    if (fullSchema) {
        const result = ApplicationSchema.safeParse(reqBody);
        if (!result.success)
            throw new ValidationError('Failed to validate full application schema.');
        return result.data as Application;
    } else {
        const result = ApplicationSchema.partial().safeParse(reqBody);
        if (!result.success || (requireId && result.data.id == null))
            throw new ValidationError('Failed to validate application schema.');
        return result.data as IncompleteApplication;
    }
}

export { createApplication, getApplication, updateApplication, parseApplication };
