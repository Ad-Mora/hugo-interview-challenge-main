import { z, ZodTypeAny } from 'zod';

function makeSchemaNullableAndPartial<T extends ZodTypeAny>(schema: T): T {
    if (schema instanceof z.ZodObject) {
        const nullableShape = Object.fromEntries(
            Object.entries(schema.shape).map(([key, value]) => [
                key,
                makeSchemaNullableAndPartial(value as ZodTypeAny)
                    .nullable()
                    .optional(),
            ])
        );
        return z.object(nullableShape) as unknown as T;
    } else if (schema instanceof z.ZodArray) {
        return z
            .array(makeSchemaNullableAndPartial(schema.element))
            .nullable()
            .optional() as unknown as T;
    } else {
        return schema.nullable().optional() as unknown as T;
    }
}

const VehicleSchema = z.object({
    vin: z.string(),
    year: z.number(),
    make: z.string(),
    model: z.string(),
});

const ApplicationSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    dob: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string().nullable(),
    vehicles: z.array(VehicleSchema),
});

const IncompleteApplicationSchema = makeSchemaNullableAndPartial(ApplicationSchema);

export { VehicleSchema, ApplicationSchema, IncompleteApplicationSchema };
