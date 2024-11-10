import { useState } from 'react';
import styles from './styles.module.css';
import spinner from '../../assets/spinner.svg';
import axios from 'axios';
import { API_ROOT } from '../../constants';
import thirdPartyInitData from '../../third-party-init-data';
import { useNavigate } from 'react-router-dom';

function StartPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleStart() {
        setLoading(true);
        try {
            const response = await axios.post(`${API_ROOT}`, thirdPartyInitData);
            const newRoute = response.data.route;
            navigate(newRoute);
        } catch (e) {
            console.error('Error initializing application data');
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>
                Simluate starting an application on a 3rd party site:
            </h1>
            {loading ? (
                <img src={spinner} className={styles.spinner} />
            ) : (
                <button className={styles.startButton} onClick={handleStart}>
                    Start Application
                </button>
            )}
        </div>
    );
}

export default StartPage;
