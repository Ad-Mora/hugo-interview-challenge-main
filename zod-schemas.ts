import { z, ZodTypeAny } from 'zod';

const isAtLeast16YearsOld = (dobString: string) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dobString)) return false;

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
    id: z.string(),
    vin: z.string().min(1),
    year: z
        .number()
        .int({ message: 'Year must be an integer.' })
        .min(1985, { message: 'Year must be >=1985.' })
        .max(new Date().getFullYear() + 1, {
            message: `Year cannot be greater than ${new Date().getFullYear() + 1}.`,
        }),
    make: z.string().min(1),
    model: z.string().min(1),
});

const ApplicationSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    dob: z.string().refine(isAtLeast16YearsOld, {
        message:
            'Must be a valid date in YYYY-MM-DD format, and must be at least 16 years old.',
    }),
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zipcode: z
        .string()
        .length(5, { message: 'Must be exactly 5 digits long.' })
        .regex(/^\d+$/, { message: 'Must be numeric.' })
        .nullable(),
    vehicles: z
        .array(VehicleSchema)
        .min(1, { message: 'Must have at least 1 vehicle.' })
        .max(3, { message: 'Cannot have more than 3 vehicles' }),
});

const IncompleteApplicationSchema = makeSchemaNullableAndPartial(ApplicationSchema);
const IncompleteVehicleSchema = makeSchemaNullableAndPartial(VehicleSchema);

export {
    VehicleSchema,
    ApplicationSchema,
    IncompleteApplicationSchema,
    IncompleteVehicleSchema,
};
