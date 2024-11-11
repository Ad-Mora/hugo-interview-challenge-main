import type { IncompleteVehicleData } from '../../../../../types';
import { VehicleErrors } from '../../../types';
import styles from './styles.module.css';
import VehicleInput from './VehicleInput/VehicleInput';

interface VehicleProps {
    vehicles: IncompleteVehicleData[] | null | undefined;
    setVehicles: (vehicles: IncompleteVehicleData[]) => void;
    vehicleErrors: VehicleErrors;
    setVehicleErrors: React.Dispatch<React.SetStateAction<VehicleErrors>>;
}

function Vehicles({
    vehicles,
    setVehicles,
    vehicleErrors,
    setVehicleErrors,
}: VehicleProps) {
    let vehicleInputs = null;
    if (vehicles != null) {
        vehicleInputs = vehicles.map((vehicle) => (
            <VehicleInput
                id={vehicle.id!}
                vehicle={vehicle}
                vehicleErrors={vehicleErrors}
                setVehicles={setVehicles}
                setVehicleErrors={setVehicleErrors}
            />
        ));
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h1 className={styles.headerText}>Vehicles</h1>
                <button className={styles.addVehicleButton}>Add Vehicle</button>
            </div>
            {vehicleInputs}
            <div className={styles.bottomBorder} />
        </div>
    );
}

export default Vehicles;
