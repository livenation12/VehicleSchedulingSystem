import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import useFetch from "@/hooks/useFetch";
import useUserStorage from "@/hooks/useUserStorage";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { defaultUserStore } from "@/hooks/useUserStorage";
import { UserRoundCogIcon } from "lucide-react";
export default function AdminNavbar() {
          const [user, setUser] = useUserStorage()
          const navigate = useNavigate()
          const links = [
                    {
                              name: "Dashboard",
                              path: "dashboard"
                    },
                    {
                              name: "Vehicles",
                              path: "vehicles"
                    },
                    {
                              name: "Users",
                              path: "users"
                    },
          ]
          const handleLogout = async () => {
                    const response = await useFetch({ path: "/auth/logout", request: { method: 'GET', credentials: "include" } })
                    if (response.success) {
                              navigate("/admin/gate")
                              setUser(defaultUserStore)
                    }
          }

          return (
                    <nav className="sticky flex items-center top-0 left-0 right-0 backdrop-blur z-50 text-sm py-4 text-blue-900">
                              <div className="container">
                                        <div className="flex justify-between items-center w-full">
                                                  <div className="flex items-center gap-x-5">
                                                            <Link to='' className="font-semibold rounded-full border p-3 bg-blue-900 text-white text-center">
                                                                      VSS Administrator

                                                            </Link>
                                                            {links.map((link, index) => (
                                                                      <NavLink key={index} to={link.path} className={({ isActive }) => isActive ? "underline underline-offset-4 text-yellow-400" : "hover:text-yellow-600"}>
                                                                                {link.name}
                                                                      </NavLink>
                                                            ))}
                                                  </div>
                                                  <DropdownMenu>
                                                            <DropdownMenuTrigger>
                                                                      <UserRoundCogIcon />
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                      <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                                                                      <DropdownMenuSeparator />
                                                                      <DropdownMenuItem onClick={() => handleLogout()}>Logout</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                  </DropdownMenu>
                                        </div>
                              </div>
                    </nav>
          )
}
