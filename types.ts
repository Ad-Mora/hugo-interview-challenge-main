import { z } from 'zod';
import {
    VehicleSchema,
    ApplicationSchema,
    IncompleteApplicationSchema,
    IncompleteVehicleSchema,
} from './zod-schemas';

type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

type Vehicle = z.infer<typeof VehicleSchema>;
type Application = z.infer<typeof ApplicationSchema>;

// inferred type doesn't account for nullability and partiality
type InferredIncompleteVehicleData = z.infer<typeof IncompleteVehicleSchema>;
type IncompleteVehicleData = Nullable<Partial<InferredIncompleteVehicleData>>;

// explicitly define the vehicles subfield as being allowed to be incomplete
type InferredIncompleteApplication = z.infer<typeof IncompleteApplicationSchema>;
type IncompleteApplication = Nullable<
    Partial<
        Omit<InferredIncompleteApplication, 'vehicles'> & {
            vehicles?: IncompleteVehicleData[] | null;
        }
    >
>;

export type { Application, Vehicle, IncompleteApplication, IncompleteVehicleData };
