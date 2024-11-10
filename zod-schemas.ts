import { z, ZodTypeAny } from 'zod';

const isAtLeast16YearsOld = (dobString: string) => {
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return false;

    const today = new Date();
    const minDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    return dob <= minDate;
};

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
    vin: z.string().min(1),
    year: z
        .number()
        .int()
        .min(1985)
        .max(new Date().getFullYear() + 1),
    make: z.string().min(1),
    model: z.string().min(1),
});

const ApplicationSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    dob: z.string().refine(isAtLeast16YearsOld),
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zipcode: z.string().length(5).regex(/^\d+$/).nullable(),
    vehicles: z.array(VehicleSchema).min(1).max(3),
});

const IncompleteApplicationSchema = makeSchemaNullableAndPartial(ApplicationSchema);

export { VehicleSchema, ApplicationSchema, IncompleteApplicationSchema };
