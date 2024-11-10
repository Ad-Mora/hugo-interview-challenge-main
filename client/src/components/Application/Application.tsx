import { useState } from 'react';
import spinner from './assets/spinner.gif';
import styles from './styles.module.css';

interface FormValues {
    [key: string]: string;
}

interface FormErrors {
    [key: string]: string;
}

function App() {
    const [values, setValues] = useState<FormValues>({});
    const [errors, setErrors] = useState<FormErrors>({});
    const [saveLoading, setSaveLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

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

    function handleSave(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        Object.entries(values).forEach(([name, value]) => validateField(name, value));
        if (Object.values(errors).every((error) => error === '')) {
            console.log('Form submitted', values);
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.formHeader}>Application Form</h1>
        </div>
    );
}

export default App;
