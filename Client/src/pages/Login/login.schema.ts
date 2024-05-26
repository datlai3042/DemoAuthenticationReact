import { z } from 'zod'

const loginSchema = z.object({
      user_email: z
            .string()
            .min(1, { message: 'Email là bắt buộc' })
            .email({ message: 'Email không hợp lệ' })
            .max(50, { message: 'Giới hạn 50 kí tự' }),
      user_password: z.string().min(5, { message: 'Mật khẩu là bắt buộc' }).max(50, { message: 'Tối đa 50 kí tự' })
})

export type TloginZodSchema = z.infer<typeof loginSchema>

export default loginSchema
