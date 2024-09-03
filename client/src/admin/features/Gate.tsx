import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SubmitHandler, useForm, } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import useFetch from "@/hooks/useFetch"
import { Label } from "@/components/ui/label"

interface LoginForm {
  email: String,
  password: String
}

export default function Gate() {
  const navigate = useNavigate()
  const { handleSubmit, register, setError, formState: { errors, isSubmitting } } = useForm<LoginForm>()
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const response = await useFetch("/admin/login", { body: data, method: "POST" })
    if (response.success) {
      navigate("/admin");
    } else {
      setError(response.field, { type: "custom", message: response.message })
    }

  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center mt-10 items-center p-3 shadow-md">
        <h2 className="text-2xl font-semibold my-2">
          VSS Admin Login
        </h2>
        <form className="flex flex-col gap-1 w-[400px]" onSubmit={handleSubmit(onSubmit)}>
          <Label className="ms-1">Email</Label>
          <Input autoFocus {...register("email", { required: "Email is required." })} placeholder="Enter your email" />
          <p className="text-red-500 ms-2 text-xs">{errors.email?.message}</p>
          <Label className="ms-1">Password</Label>
          <Input type="password" {...register("password", { required: "Password is required." })} placeholder="Enter your password" />
          <p className="text-red-500 ms-2 text-xs">{errors.password?.message}</p>
          <Button type="submit" isLoading={isSubmitting}>Login</Button>
        </form>
      </div>
    </div >
  )
}
