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
    dob: string; // yyyy-mm-dd
    street: string;
    city: string;
    state: string;
    zipcode?: string;
    vehicles: [Vehicle];
}

export { Application };
