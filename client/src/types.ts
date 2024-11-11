import type { IncompleteApplication, IncompleteVehicleData } from '../../types';

type ApplicationField = keyof IncompleteApplication;
type AppErrors = Partial<Record<ApplicationField, string>>;

type VehicleField = keyof IncompleteVehicleData;
type VehicleErrors = Record<string, Partial<Record<VehicleField, string>>;

export type { ApplicationField, AppErrors, VehicleErrors };
