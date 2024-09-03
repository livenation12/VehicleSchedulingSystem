import { Vehicle } from "@/interfaces"
import { Car, Signal, Users } from "lucide-react"
import { useEffect, useState } from "react"
export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await fetch("http://localhost:8000/api/vehicles", { credentials: 'include' })
      const data = await response.json()
      setVehicles(data)
    }
    fetchVehicles()
  }, [])
  return (
    <div className="container my-2">
      <h2 className="my-3 font-bold text-xl">Vehicle List</h2>
      <div className="grid grid-cols-3 gap-4 container">
        {vehicles.map((vehicle: Vehicle) => (
          <figure key={vehicle._id} className="hover:shadow animate-fadeIn">
            <img className="rounded-t-lg object-cover" src={`http://localhost:8000/images/vehicles/${vehicle.images[0]}`} alt={vehicle.model} />
            <figcaption className="p-3 relative">
              <div>
                <h3 className="text-lg font-semibold">{vehicle.model}</h3>
                <p className="text-sm flex items-center gap-2 uppercase"><Car size={18} /> {vehicle.licensePlate}</p>
                <p className="text-xs flex items-center gap-2"><Users size={15}/> {vehicle.maxCapacity}</p>
                <p className="absolute right-3 bottom-2 text-green-500"><Signal /></p>
              </div>
            </figcaption>
          </figure>

        ))}
      </div>

    </div>
  )
}
