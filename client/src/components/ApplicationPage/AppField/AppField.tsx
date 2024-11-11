import styles from './styles.module.css';
import React from 'react';
import { IncompleteApplication } from '../../../../../types';
import { AppErrors, ApplicationField } from '../../../types';
import { IncompleteApplicationSchema } from '../../../../../zod-schemas';

interface AppFieldProps {
    fieldName: Exclude<ApplicationField, 'vehicles'>;
    label: string;
    values: Omit<IncompleteApplication, 'vehicles'>;
    errors: AppErrors;
    setValues: React.Dispatch<React.SetStateAction<IncompleteApplication>>;
    setErrors: React.Dispatch<React.SetStateAction<AppErrors>>;
    placeholder?: string;
}

function AppField({
    fieldName,
    label,
    values,
    setValues,
    errors,
    setErrors,
    placeholder,
}: AppFieldProps) {
    function handleChange(e: React.FocusEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        const name = e.target.name as Exclude<ApplicationField, 'Vehicles'>;
        const value = e.target.value || null;
        setValues((prev) => ({ ...prev, [name]: value }));
        if (value) {
            validateField(name, value);
        } else {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }

    function validateField(name: ApplicationField, value: string) {
        const relevantSchema = IncompleteApplicationSchema.pick({
            [name]: true,
        } as Record<ApplicationField, true>);
        const result = relevantSchema.safeParse({ [name]: value });
        let error: string | undefined = undefined;
        if (!result.success) {
            error = result.error.errors[0].message;
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    }
    const fieldValue = values[fieldName];

    return (
        <div className={styles.fieldContainer}>
            <div className={styles.inputContainer}>
                <p className={styles.label}>{label}</p>
                <input
                    className={styles.textInput}
                    name={fieldName}
                    type="text"
                    value={fieldValue ?? ''}
                    placeholder={placeholder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
            </div>
            <p className={styles.errorText}>{errors[fieldName]}</p>
        </div>
    );
}

export default AppField;
