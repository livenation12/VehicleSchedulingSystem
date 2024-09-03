export interface Vehicle {
          _id: string;
          licensePlate: string;
          model: string;
          year: number;
          color: string;
          maxCapacity: number;
          images: string[];
}

// Using Omit to create VehicleForm by excluding the _id property from Vehicle
export type VehicleForm = Omit<Vehicle, '_id'>;