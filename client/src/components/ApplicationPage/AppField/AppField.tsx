import styles from './styles.module.css';
import React from 'react';
import { IncompleteApplication } from '../../../../../types';
import { AppErrors, ApplicationField } from '../../../types';
import VehiclesInput from '../VehiclesInput/VehiclesInput';

interface AppFieldProps {
    fieldName: ApplicationField;
    label: string;
    values: IncompleteApplication;
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
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    }

    function validateField(name: string, value: string) {
        let error = '';
        setErrors((prev) => ({ ...prev, [name]: error }));
    }

    if (fieldName === 'vehicles') {
        return <VehiclesInput />;
    } else {
        const fieldValue = values[fieldName];

        return (
            <div className={styles.fieldContainer}>
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
        );
    }
}

export default AppField;
