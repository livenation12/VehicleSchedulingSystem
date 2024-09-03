import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import VehicleForm from "../components/VehicleForm"
import { Button } from "@/components/ui/button"
export default function AdminVehicles() {
          return (
                    <div>
                              <Dialog>
                                        <DialogTrigger asChild>
                                                  <Button className="float-right"> Add Vehicle</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                                  <DialogHeader>
                                                            <DialogTitle>Vehicle Form</DialogTitle>
                                                            <DialogDescription className="text-sm text-gray-500">
                                                                      Add new vehicle that will be available for faculty events
                                                            </DialogDescription>
                                                  </DialogHeader>

                                                  <VehicleForm />
                                        </DialogContent>
                              </Dialog>

                    </div>
          )
}
