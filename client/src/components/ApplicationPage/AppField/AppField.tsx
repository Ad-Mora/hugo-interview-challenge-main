import React from 'react';
import { IncompleteApplication } from '../../../../../types';
import { AppErrors, ApplicationField } from '../../../types';

interface AppFieldProps {
    name: ApplicationField;
    values: IncompleteApplication;
    errors: AppErrors;
    setValues: React.Dispatch<React.SetStateAction<IncompleteApplication>>;
    setErrors: React.Dispatch<React.SetStateAction<AppErrors>>;
}

function AppField({ name, values, setValues, errors, setErrors }: AppFieldProps) {
    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        // Update the value in state only on blur
        setValues((prev) => ({ ...prev, [name]: value }));

        // Validate the field and set any errors
        validateField(name, value);
    }

    function validateField(name: string, value: string) {
        let error = '';
        if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            error = 'Invalid email address';
        }
        setErrors((prev) => ({ ...prev, [name]: error }));
    }

    return (
        <div>
            <input type="text" />
        </div>
    );
}

export default AppField;
