import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { IncompleteApplication, IncompleteVehicleData } from '../../../../types';
import type { AppErrors, VehicleErrors } from '../../types';
import { API_ROOT } from '../../constants';
import AppField from './AppField/AppField';
import SubmissionButton from './SubmissionButton/SubmissionButton';
import { ApplicationSchema } from '../../../../zod-schemas';
import Vehicles from './Vehicles/Vehicles';

function App() {
    const [values, setValues] = useState<IncompleteApplication>({});
    const [errors, setErrors] = useState<AppErrors>({});
    const [vehicleErrors, setVehicleErrors] = useState<VehicleErrors>({});
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

    // initialize the form's data
    useEffect(() => {
        initData();
    }, []);

    function setVehicles(vehicles: IncompleteVehicleData[] | null) {
        setValues((prev) => ({ ...prev, vehicles }));
    }

    async function handleSave(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setSaveLoading(true);
        setSubmissionData('');
        setSubmissionError('');
        // TODO confirm save with Toast
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setSubmitLoading(true);
        setSubmissionData('');
        setSubmissionError('');
        // TODO confirm submit with Toast
    }

    const saveValid = Object.values(errors).every((val) => !val);
    const submitValid = saveValid && ApplicationSchema.safeParse(values).success;

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
                        fieldName="firstName"
                        label="First Name*"
                        placeholder="e.g. Hugo"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />

                    <AppField
                        fieldName="lastName"
                        label="Last Name*"
                        placeholder="e.g. Insurance"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />

                    <AppField
                        fieldName="dob"
                        label="Date of Birth*"
                        placeholder="e.g. 1995-01-01"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />

                    <AppField
                        fieldName="street"
                        label="Street*"
                        placeholder="e.g. 123 Ez St"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />

                    <AppField
                        fieldName="city"
                        label="City*"
                        placeholder="e.g. Boston"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />

                    <AppField
                        fieldName="state"
                        label="State*"
                        placeholder="e.g. MA"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />

                    <AppField
                        fieldName="zipcode"
                        label="Zipcode"
                        placeholder="e.g. 08816"
                        values={values}
                        errors={errors}
                        setValues={setValues}
                        setErrors={setErrors}
                    />
                </div>
                <Vehicles
                    vehicles={values.vehicles}
                    setVehicles={setVehicles}
                    vehicleErrors={vehicleErrors}
                    setVehicleErrors={setVehicleErrors}
                />
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
