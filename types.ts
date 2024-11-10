type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

interface Vehicle {
    vin: string;
    year: number;
    make: string;
    model: string;
}

interface Application {
    id: number;
    firstName: string;
    lastName: string;
    dob: string;
    street: string;
    city: string;
    state: string;
    zipcode: string | null;
    vehicles: [Vehicle];
}

type IncompleteApplication = Partial<Nullable<Application>>;

export { Application, Vehicle, IncompleteApplication };
