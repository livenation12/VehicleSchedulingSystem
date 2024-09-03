import { vehicles, create } from "../services/vehicleService.js"

export const getVehicles = async (req, res) => {
          try {
                    res.status(200).json(await vehicles())
          } catch (error) {
                    res.status(400).json(error)
          }
}

export const createVehicle = async (req, res) => {
          try {
                    // Extract vehicle data from the request body
                    const vehicleData = req.body;

                    // Include only the filenames of uploaded files
                    if (req.files && req.files.length > 0) {
                              vehicleData.images = req.files.map(file => file.filename);
                    }

                    // Create a new vehicle with the associated file names
                    const newVehicle = await create(vehicleData);

                    res.status(201).json({ success: true, created: newVehicle });
          } catch (error) {
                    // Return appropriate status codes based on error type
                    const statusCode = error.statusCode || 500;  // Default to 500 if no status code provided
                    res.status(statusCode).json({ error: error.message });
          }
};
