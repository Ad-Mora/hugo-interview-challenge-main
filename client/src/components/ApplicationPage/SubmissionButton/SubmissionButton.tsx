import React from 'react';
import styles from './styles.module.css';
import spinner from '../../../assets/spinner.svg';

interface SubmissionButtonProps {
    text: string;
    isValid: boolean;
    isLoading: boolean;
    handler: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
    validStyles: string;
}

function SubmissionButton({
    text,
    isValid,
    isLoading,
    handler,
    validStyles,
}: SubmissionButtonProps) {
    const buttonStylesArr = [validStyles];
    const boxStylesArr = [styles.buttonBox];

    if (!isValid) {
        buttonStylesArr.push(styles.disabledButton);
        boxStylesArr.push(styles.disabledBox);
    }

    const buttonStyles = buttonStylesArr.join(' ');
    const boxStyles = boxStylesArr.join(' ');

    return (
        <div className={boxStyles}>
            {isLoading ? (
                <img className={styles.spinner} src={spinner} />
            ) : (
                <button className={buttonStyles} onClick={handler}>
                    {text}
                </button>
            )}
        </div>
    );
}

export default SubmissionButton;
