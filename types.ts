interface Vehicle {
    vin: string;
    year: number;
    make: string;
    model: string;
}

interface Application {
    id: string;
    firstName: string;
    lastName: string;
    dob: Date;
    address: {
        street: string;
        city: string;
        state: string;
        zipcode?: string;
    };
    vehicles: [Vehicle];
}

export { Application };
