import db from './db';
import { Prisma, Application as DbApplication } from '@prisma/client';
import { Application, Vehicle, IncompleteApplication } from '../types';

// transform the data from the DTO format to the DB format
function convertAppToDbFormat(data: IncompleteApplication) {
    const vehicles =
        data.vehicles === undefined ? undefined : JSON.stringify(data.vehicles);
    return { ...data, vehicles };
}

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
function parseApplication(
    reqBody: object,
    requireId = false,
    fullSchema = false
): IncompleteApplication {}

export { createApplication, getApplication, updateApplication, parseApplication };
