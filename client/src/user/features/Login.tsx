import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { Label } from "@/components/ui/label";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, HomeIcon, Lock, UserCheck } from "lucide-react";

interface LoginForm {
          email: string;
          password: string;
}

interface LocationState {
          from?: Location;
}

export default function Login() {
          const navigate = useNavigate();
          const location = useLocation();
          const { handleSubmit, register, setError, formState: { errors, isSubmitting } } = useForm<LoginForm>();
          const { dispatch } = useAuth();
          const [isPasswordShown, setIsPasswordShown] = useState(false)
          const onSubmit: SubmitHandler<LoginForm> = async (data) => {
                    const response = await useFetch('/auth/login', { body: data, method: 'POST' });
                    if (response.success) {
                              // Redirect to the location saved in state, or default to home
                              const redirectTo = (location.state as LocationState)?.from?.pathname || '/';
                              navigate(redirectTo, { replace: true });
                              dispatch({ type: "LOGIN", payload: response.data });
                    } else {
                              setError(response.field, { type: "custom", message: response.message });
                    }
          };
          return (
                    <div>
                              <Link to={'/home'} className="inline-flex"><HomeIcon /> Back to Homepage</Link>
                              <div className="flex flex-col justify-center items-center">

                                        <div className="flex flex-col justify-center mt-10 items-center p-3 shadow-md">
                                                  <h2 className="text-2xl font-semibold my-2">Login</h2>
                                                  <form className="flex flex-col gap-1 w-[400px]" onSubmit={handleSubmit(onSubmit)}>
                                                            <Label className="ms-1">Email</Label>
                                                            <Input type="email" startIcon={<UserCheck size={18} />} autoFocus {...register("email", { required: "Email is required." })} placeholder="Enter your email" />
                                                            <p className="text-red-500 ms-2 text-xs">{errors.email?.message}</p>
                                                            <Label className="ms-1">Password</Label>
                                                            <Input startIcon={<Lock size={18} />} type={isPasswordShown ? 'text' : 'password'} {...register("password", { required: "Password is required." })} endIcon={isPasswordShown ? <EyeOffIcon size={18} onClick={() => setIsPasswordShown(!isPasswordShown)} /> : <EyeIcon size={18} onClick={() => setIsPasswordShown(!isPasswordShown)} />} placeholder="Enter your password" />
                                                            <p className="text-red-500 ms-2 text-xs">{errors.password?.message}</p>
                                                            <Button type="submit" isLoading={isSubmitting}>Login</Button>
                                                  </form>
                                        </div>
                              </div>
                    </div>
          );
}
