import styles from './styles.module.css';
import { IncompleteVehicleData } from '../../../../../../types';
import { VehicleErrors } from '../../../../types';
import VehicleField from './VehicleField/VehicleField';

interface VehicleInputProps {
    id: string;
    vehicles: IncompleteVehicleData[];
    vehicleNum: number;
    setVehicles: (vehicles: IncompleteVehicleData[]) => void;
    vehicleErrors: VehicleErrors;
    setVehicleErrors: React.Dispatch<React.SetStateAction<VehicleErrors>>;
}

function VehicleInput({
    id,
    vehicles,
    vehicleNum,
    setVehicles,
    vehicleErrors,
    setVehicleErrors,
}: VehicleInputProps) {
    return (
        <div className={styles.vehicleContainer}>
            <h1 className={styles.vehicleHeader}>Vehicle {vehicleNum}</h1>
            <VehicleField
                fieldName="vin"
                label="VIN"
                placeholder="e.g. 12345678"
                vehicleId={id}
                vehicles={vehicles}
                setVehicles={setVehicles}
                vehicleErrors={vehicleErrors}
                setVehicleErrors={setVehicleErrors}
            />

            <VehicleField
                fieldName="year"
                label="Year"
                placeholder="e.g. 2015"
                vehicleId={id}
                vehicles={vehicles}
                setVehicles={setVehicles}
                vehicleErrors={vehicleErrors}
                setVehicleErrors={setVehicleErrors}
            />

            <VehicleField
                fieldName="make"
                label="Make"
                placeholder="e.g. Toyota"
                vehicleId={id}
                vehicles={vehicles}
                setVehicles={setVehicles}
                vehicleErrors={vehicleErrors}
                setVehicleErrors={setVehicleErrors}
            />

            <VehicleField
                fieldName="model"
                label="Model"
                placeholder="e.g. RAV4"
                vehicleId={id}
                vehicles={vehicles}
                setVehicles={setVehicles}
                vehicleErrors={vehicleErrors}
                setVehicleErrors={setVehicleErrors}
            />
        </div>
    );
}

export default VehicleInput;
