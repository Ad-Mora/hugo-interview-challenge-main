import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { IncompleteApplication } from '../../../../types';
import type { AppErrors } from '../../types';
import { API_ROOT } from '../../constants';
import AppField from './AppField/AppField';
import SubmissionButton from './SubmissionButton/SubmissionButton';

function App() {
    const [values, setValues] = useState<IncompleteApplication>({});
    const [errors, setErrors] = useState<AppErrors>({});
    const [pageLoading, setPageLoading] = useState(true);
    const [pageLoadError, setPageLoadError] = useState('');
    const [saveLoading, setSaveLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submissionError, setSubmissionError] = useState('');
    const [submissionData, setSubmissionData] = useState('');
    const { id } = useParams<{ id: string }>();

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

    function isSaveValid() {
        return true;
    }

    function isSubmitValid() {
        return true;
    }

    // initialize the form's data
    useEffect(() => {
        initData();
    }, []);

    async function handleSave(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setSaveLoading(true);
        setSubmissionData('');
        setSubmissionError('');
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setSubmitLoading(true);
        setSubmissionData('');
        setSubmissionError('');
    }

    const saveValid = isSaveValid();
    const submitValid = isSubmitValid();

    if (pageLoading) {
        return (
            <div className={styles.container}>
                {pageLoadError ? (
                    <p className={styles.pageLoadError}>{pageLoadError}</p>
                ) : (
                    <h1 className={styles.loadingText}>Loading application data...</h1>
                )}
            </div>
        );
    } else {
        return (
            <div className={styles.container}>
                <h1 className={styles.formHeader}>Application Form</h1>
                <div className={styles.fieldsContainer}>
                    <AppField
                        name="firstName"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />

                    <AppField
                        name="lastName"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />

                    <AppField
                        name="dob"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />

                    <AppField
                        name="street"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />

                    <AppField
                        name="city"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />

                    <AppField
                        name="state"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />

                    <AppField
                        name="zipcode"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />

                    <AppField
                        name="vehicles"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />
                </div>
                <div className={styles.buttonsContainer}>
                    <SubmissionButton
                        text={'Save'}
                        isValid={saveValid}
                        isLoading={saveLoading}
                        handler={handleSave}
                        validStyles={styles.saveButton}
                    />

                    <SubmissionButton
                        text={'Submit'}
                        isValid={submitValid}
                        isLoading={submitLoading}
                        handler={handleSubmit}
                        validStyles={styles.submitButton}
                    />
                </div>

                <div className={styles.submissionDataSection}>
                    {submissionError !== '' && (
                        <p className={styles.submissionError}>{submissionError}</p>
                    )}
                    {submissionData !== '' && (
                        <p className={styles.submissionData}>{submissionData}</p>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
