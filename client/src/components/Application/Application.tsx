import { useState, useEffect } from 'react';
import spinner from './assets/spinner.gif';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { IncompleteApplication } from '../../../../types';
import { API_ROOT } from '../../constants';

type AppErrors = { [K in keyof IncompleteApplication]: string };

function App() {
    const [values, setValues] = useState<IncompleteApplication>({});
    const [errors, setErrors] = useState<AppErrors>({});
    const [pageLoading, setPageLoading] = useState(true);
    const [pageLoadError, setPageLoadError] = useState('');
    const [saveLoading, setSaveLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const { id } = useParams<{ id: string }>();

    // initialize the form's data
    useEffect(() => {
        async function initData() {
            try {
                const appData = await axios.get(`${API_ROOT}/${id}`);
                const data = appData.data.data as IncompleteApplication;
                setValues(data);
                setPageLoading(false);
            } catch (e) {
                console.error('Error getting application data', e);
                setPageLoadError(`Could not find an application with id ${id}`);
            }
        }
        initData();
    }, []);

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

    if (pageLoading) {
        return (
            <div className={styles.container}>
                <h1 className={styles.loadingText}>Loading application data...</h1>
                <p className={styles.pageLoadError}>{pageLoadError}</p>
            </div>
        );
    } else {
        return (
            <div className={styles.container}>
                <h1 className={styles.formHeader}>Application Form</h1>
            </div>
        );
    }
}

export default App;
