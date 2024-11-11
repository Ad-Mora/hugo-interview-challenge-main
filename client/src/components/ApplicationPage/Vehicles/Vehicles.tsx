import type { IncompleteVehicleData } from '../../../../../types';
import { VehicleErrors } from '../../../types';
import styles from './styles.module.css';
import VehicleInput from './VehicleInput/VehicleInput';

interface VehicleProps {
    vehicles: IncompleteVehicleData[] | null | undefined;
    setVehicles: (vehicles: IncompleteVehicleData[] | null) => void;
    vehicleErrors: VehicleErrors;
    setVehicleErrors: React.Dispatch<React.SetStateAction<VehicleErrors>>;
}

function Vehicles({
    vehicles,
    setVehicles,
    vehicleErrors,
    setVehicleErrors,
}: VehicleProps) {
    function handleAddVehicle(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const newVehicle: IncompleteVehicleData = {
            id: crypto.randomUUID(),
            vin: null,
            year: null,
            make: null,
            model: null,
        };

        if (vehicles != null) {
            setVehicles([...vehicles, newVehicle]);
        } else {
            setVehicles([newVehicle]);
        }
    }

    let vehicleInputs = null;
    if (vehicles != null) {
        vehicleInputs = vehicles.map((vehicle, idx) => (
            <VehicleInput
                key={vehicle.id}
                id={vehicle.id!}
                vehicleNum={idx + 1}
                vehicles={vehicles}
                vehicleErrors={vehicleErrors}
                setVehicles={setVehicles}
                setVehicleErrors={setVehicleErrors}
            />
        ));
    }

    const addVehicleButtonStylesArr = [styles.addVehicleButton];
    if (vehicles && vehicles.length >= 3) {
        addVehicleButtonStylesArr.push(styles.disabledButton);
    }
    const vehicleButtonStyles = addVehicleButtonStylesArr.join(' ');

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h1 className={styles.headerText}>Vehicles</h1>
                <button className={vehicleButtonStyles} onClick={handleAddVehicle}>
                    Add Vehicle
                </button>
            </div>
            {vehicleInputs}
            <div className={styles.bottomBorder} />
        </div>
    );
}

export default Vehicles;
