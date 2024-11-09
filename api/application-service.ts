import db from './db';
import { Application } from '../types';

async function createApplication(data: Partial<Application>) {}
async function updateApplication(data: Partial<Application>) {}
async function getApplication(id: number) {}
function parseApplication(reqBody: object, requireId = false, fullSchema = false) {}

export { createApplication, getApplication, updateApplication, parseApplication };
