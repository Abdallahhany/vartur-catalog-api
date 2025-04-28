import { z } from 'zod'


export const loginSchema = z.object({
  username: z.string().min(5, 'Username must be at least 5 characters long'),
  password: z.string().min(5, 'Password must be at least 5 characters long'),
})


export const registerSchema = z
  .object({
    username: z.string().min(5, 'Username must be at least 5 characters long'),
    password: z.string().min(5, 'Password must be at least 5 characters long'),
    confirmPassword: z.string().min(5, 'Password must be at least 5 characters long'),
  })


export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
