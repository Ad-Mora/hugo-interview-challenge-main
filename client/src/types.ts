import type { IncompleteApplication } from '../../types';

type ApplicationField = keyof IncompleteApplication;
type AppErrors = Partial<Record<ApplicationField, String>>;

export type { ApplicationField, AppErrors };
