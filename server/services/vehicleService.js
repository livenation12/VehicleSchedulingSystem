import ValidationError from "../controllers/errorHandler.js";
import Vehicle from "../models/Vehicle.js";

const isLicensePlateExist = async (licensePlate) => {
          const vehicle = await Vehicle.findOne({ licensePlate });
          return vehicle;
}

export const vehicles = async () => {
          return await Vehicle.find();
}

export const create = async (data) => {
          const licensePlateExist = await isLicensePlateExist(data.licensePlate);
          if (licensePlateExist) {
                    throw new ValidationError("Vehicle already exists", "licensePlate", 409);
          }
          console.log(data);
          
          const newVehicle = new Vehicle(data);
          return await newVehicle.save();
};