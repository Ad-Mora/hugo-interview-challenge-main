import { useState } from 'react';
import styles from './styles.module.css';
import spinner from '../../assets/spinner.svg';

function StartPage() {
    const [loading, setLoading] = useState(false);
    async function handleStart() {
        setLoading(true);
        // TODO
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
