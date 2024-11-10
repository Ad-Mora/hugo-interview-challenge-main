import { z } from 'zod';
import {
    VehicleSchema,
    ApplicationSchema,
    NullablePartialApplicationSchema,
} from './zod-schemas';

type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

type Vehicle = z.infer<typeof VehicleSchema>;
type Application = z.infer<typeof ApplicationSchema>;

// inferred type doesn't account for nullability and partiality
type InferredIncompleteApplication = z.infer<typeof NullablePartialApplicationSchema>;
type IncompleteApplication = Nullable<Partial<InferredIncompleteApplication>>;

export { Application, Vehicle, IncompleteApplication };
