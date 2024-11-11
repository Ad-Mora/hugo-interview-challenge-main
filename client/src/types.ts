import type { IncompleteApplication, IncompleteVehicleData } from '../../types';

type ApplicationField = keyof IncompleteApplication;
type AppErrors = Partial<Record<ApplicationField, string>>;

type VehicleFieldName = keyof IncompleteVehicleData;
type VehicleErrors = Record<string, Partial<Record<VehicleFieldName, string>>;

export type { ApplicationField, AppErrors, VehicleErrors, VehicleFieldName };
