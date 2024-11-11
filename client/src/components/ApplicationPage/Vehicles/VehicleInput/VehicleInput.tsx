import { IncompleteVehicleData } from '../../../../../../types';
import { VehicleErrors } from '../../../../types';

interface VehicleInputProps {
    id: string;
    vehicle: IncompleteVehicleData;
    setVehicles: (vehicles: IncompleteVehicleData[]) => void;
    vehicleErrors: VehicleErrors;
    setVehicleErrors: React.Dispatch<React.SetStateAction<VehicleErrors>>;
}

function VehicleInput({
    id,
    vehicle,
    setVehicles,
    vehicleErrors,
    setVehicleErrors,
}: VehicleInputProps) {
    return (
        <div>
            <h1>Input</h1>
        </div>
    );
}

export default VehicleInput;
