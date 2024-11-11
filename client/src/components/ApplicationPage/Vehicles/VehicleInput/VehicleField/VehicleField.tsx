import styles from './styles.module.css';
import { IncompleteVehicleData } from '../../../../../../../types';
import { VehicleErrors, VehicleFieldName } from '../../../../../types';

interface VehicleFieldProps {
    fieldName: VehicleFieldName;
    label: string;
    isNumberField?: boolean;
    vehicleId: string;
    placeholder: string;
    vehicles: IncompleteVehicleData[];
    setVehicles: (vehicles: IncompleteVehicleData[]) => void;
    vehicleErrors: VehicleErrors;
    setVehicleErrors: React.Dispatch<React.SetStateAction<VehicleErrors>>;
}

function findById(vehicles: IncompleteVehicleData[], id: string) {
    return vehicles.filter((vehicle) => vehicle.id === id)[0];
}

function replaceById(
    vehicles: IncompleteVehicleData[],
    id: string,
    data: IncompleteVehicleData
) {
    return vehicles.map((vehicle) => (vehicle.id === id ? data : vehicle));
}

function VehicleField({
    fieldName,
    label,
    vehicleId,
    isNumberField,
    placeholder,
    vehicles,
    setVehicles,
    vehicleErrors,
    setVehicleErrors,
}: VehicleFieldProps) {
    function handleChange(e: React.FocusEvent<HTMLInputElement>) {
        const name = e.target.name as VehicleFieldName;
        let value: string | number | null = e.target.value || null;
        if (name === 'year' && value != null) {
            value = parseInt(value);
        }

        const currentVehicle = findById(vehicles, vehicleId);
        const newVehicle: IncompleteVehicleData = { ...currentVehicle, [name]: value };
        const newVehicles = replaceById(vehicles, vehicleId, newVehicle);
        setVehicles(newVehicles);
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        handleChange(e);
        validateField();
    }

    function validateField() {}

    const currentVehicle = findById(vehicles, vehicleId);
    const fieldValue = currentVehicle[fieldName];
    const inputType = isNumberField ? 'number' : 'text';

    return (
        <div className={styles.fieldContainer}>
            <div className={styles.inputContainer}>
                <p className={styles.label}>{label}</p>
                <input
                    className={styles.textInput}
                    name={fieldName}
                    type={inputType}
                    value={fieldValue ?? ''}
                    placeholder={placeholder}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
            </div>
            <p className={styles.errorText}>{vehicleErrors.id?.vin}</p>
        </div>
    );
}

export default VehicleField;
