import styles from './styles.module.css';
import { IncompleteVehicleData } from '../../../../../../types';
import { VehicleErrors } from '../../../../types';
import VehicleField from './VehicleField/VehicleField';

interface VehicleInputProps {
    id: string;
    vehicles: IncompleteVehicleData[];
    vehicleNum: number;
    setVehicles: (vehicles: IncompleteVehicleData[] | null) => void;
    vehicleErrors: VehicleErrors;
    setVehicleErrors: React.Dispatch<React.SetStateAction<VehicleErrors>>;
}

function removeById(vehicles: IncompleteVehicleData[], id: string) {
    return vehicles.filter((vehicle) => vehicle.id !== id);
}

function VehicleInput({
    id,
    vehicles,
    vehicleNum,
    setVehicles,
    vehicleErrors,
    setVehicleErrors,
}: VehicleInputProps) {
    function handleRemoveVehicle() {
        const newVehicles = removeById(vehicles, id);
        if (newVehicles.length === 0) {
            setVehicles(null);
        }
        const newVehicleErrors = { ...vehicleErrors };
        delete newVehicleErrors[id];

        setVehicles(newVehicles);
        setVehicleErrors(newVehicleErrors);
    }

    return (
        <div className={styles.vehicleContainer}>
            <div className={styles.vehicleInputs}>
                <h1 className={styles.vehicleHeader}>Vehicle {vehicleNum}</h1>
                <VehicleField
                    fieldName="vin"
                    label="VIN*"
                    placeholder="e.g. 12345678"
                    vehicleId={id}
                    vehicles={vehicles}
                    setVehicles={setVehicles}
                    vehicleErrors={vehicleErrors}
                    setVehicleErrors={setVehicleErrors}
                />

                <VehicleField
                    fieldName="year"
                    label="Year*"
                    placeholder="e.g. 2015"
                    isNumberField={true}
                    vehicleId={id}
                    vehicles={vehicles}
                    setVehicles={setVehicles}
                    vehicleErrors={vehicleErrors}
                    setVehicleErrors={setVehicleErrors}
                />

                <VehicleField
                    fieldName="make"
                    label="Make*"
                    placeholder="e.g. Toyota"
                    vehicleId={id}
                    vehicles={vehicles}
                    setVehicles={setVehicles}
                    vehicleErrors={vehicleErrors}
                    setVehicleErrors={setVehicleErrors}
                />

                <VehicleField
                    fieldName="model"
                    label="Model*"
                    placeholder="e.g. RAV4"
                    vehicleId={id}
                    vehicles={vehicles}
                    setVehicles={setVehicles}
                    vehicleErrors={vehicleErrors}
                    setVehicleErrors={setVehicleErrors}
                />
            </div>
            <button className={styles.removeButton} onClick={handleRemoveVehicle}>
                Remove Vehicle
            </button>
        </div>
    );
}

export default VehicleInput;
