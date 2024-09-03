import { Button } from '@/components/ui/button'
import UserForm from './users/components/UserForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"

export default function AdminUsers() {
          return (
                    <div>
                              <Dialog>
                                        <DialogTrigger asChild>
                                                  <Button className='float-right'>New User</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                                  <DialogHeader>
                                                            <DialogTitle>Users Form</DialogTitle>
                                                            <DialogDescription className="text-sm text-gray-500">
                                                                      Add users who can access the system
                                                            </DialogDescription>
                                                  </DialogHeader>
                                                  <UserForm />
                                        </DialogContent>
                              </Dialog>

                    </div>
          )
}
