import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import type { UserForm } from '@/interfaces/user.interface'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'

export default function UserForm() {
          const [isShown, setIsShown] = useState(false)
          const { register, handleSubmit, formState: { errors } } = useForm<UserForm>({})
          const onSubmit: SubmitHandler<UserForm> = (data) => {
                    

          }
          return (
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                              <Label>Email</Label>
                              <Input {...register('email', { required: true })} placeholder="Email" />
                              <p>{errors.email?.message}</p>
                              <Label>First name</Label>
                              <Input {...register('firstName', { required: true })} placeholder="First name" />
                              <p>{errors.firstName?.message}</p>
                              <Label>Last name</Label>
                              <Input {...register('lastName', { required: true })} placeholder="Last name" />
                              <p>{errors.lastName?.message}</p>
                              <Label>Password</Label>
                              <Input type={isShown ? 'text' : 'password'} {...register('password', { required: true })} placeholder="Password" />
                              <p>{errors.password?.message}</p>
                              <Label>Confirm Password</Label>
                              <Input type={isShown ? 'text' : 'password'} {...register('confirmPassword', { required: true })} placeholder="Confirm Password" />
                              <div className='inline-flex justify-end items-center gap-3'><Switch onClick={() => setIsShown(!isShown)} /> <span className='text-sm'>{isShown ? 'Hide Password' : 'Show Password'}</span></div>
                              <Button type="submit">Create</Button>
                    </form>
          )
}
