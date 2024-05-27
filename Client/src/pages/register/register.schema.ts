import { z } from 'zod'

const registerSchema = z.object({
      user_email: z
            .string()
            .min(1, { message: 'Email là bắt buộc' })
            .email({ message: 'Email không hợp lệ' })
            .max(50, { message: 'Giới hạn 50 kí tự' }),
      user_password: z.string().min(5, { message: 'Mật khẩu là bắt buộc' }).max(50, { message: 'Tối đa 50 kí tự' }),
      user_last_name: z.string().min(2, { message: 'Tên là bắt buộc' }).max(50, { message: 'Tên tối đa 50 kí tự' }),
      user_first_name: z.string().min(2, { message: 'Họ là bắt buộc' }).max(50, { message: 'Họ tối đa 50 kí tự' })
})

export type TRegisterSchema = z.infer<typeof registerSchema>

export default registerSchema
