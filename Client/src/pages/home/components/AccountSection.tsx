import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import registerSchema from '../../register/register.schema'
import { useMutation } from '@tanstack/react-query'
import { fetchUser } from '../../../redux/auth.slice'
import UserService from '../../../services/user.service'
import { z } from 'zod'
import { addToast } from '../../../redux/toast.slice'
import { generateIdToast } from '../../../utils/axiosError'

export type UpdateUser = Omit<Auth.RegisterParam, 'user_password'>

const updateUserValidate = registerSchema.omit({ user_password: true })
export type UpdateUserValidate = z.infer<typeof updateUserValidate>

const AccountSection = () => {
      const dispatch = useDispatch()

      const updateUserForm = useForm<UpdateUser>({
            defaultValues: async () => {
                  const res = await UserService.getMe()
                  const { user } = res.data.metadata
                  return user
            },
            resolver: zodResolver(updateUserValidate)
      })

      const updateUserMutation = useMutation({
            mutationKey: ['update-info'],
            mutationFn: (data: UpdateUser) => UserService.updateInfo(data),
            onSuccess: (res) => {
                  const { user } = res.data.metadata

                  dispatch(fetchUser({ user, isLogin: true }))
                  dispatch(addToast({ type: 'SUCCESS', id: generateIdToast(), message: 'Cập nhập thành công' }))
            }
      })

      const error_email = updateUserForm.formState.errors.user_email
      const error_last_name = updateUserForm.formState.errors.user_last_name
      const error_first_name = updateUserForm.formState.errors.user_first_name

      console.log({ errors: updateUserForm.formState.errors })
      const onSubmit = (data: UpdateUser) => {
            updateUserMutation.mutate(data)
      }

      return (
            <div className='w-full h-max flex flex-col justify-center'>
                  <h2 className='text-[3rem]'>Thông tin tài khoản</h2>
                  <form
                        className='mt-[2rem] w-[40rem] flex flex-col  gap-[2rem] sm:gap-[3rem] xl:gap-[1.4rem]'
                        onSubmit={updateUserForm.handleSubmit(onSubmit)}
                  >
                        <div className='w-[calc(100%-1rem)] flex flex-col sm:flex-row gap-[1rem]'>
                              <div className='w-full sm:w-[50%] flex flex-col  gap-[.5rem]'>
                                    <label
                                          htmlFor='first_name'
                                          className='text-[1.2rem] font-normal hover:cursor-pointer'
                                    >
                                          Họ của bạn
                                    </label>
                                    <input
                                          {...updateUserForm.register('user_first_name')}
                                          defaultValue={updateUserForm.watch('user_first_name')}
                                          type='text'
                                          id='first_name'
                                          className='h-[2.8rem] px-[1rem] text-[1.2rem] rounded-md border-[.1rem] border-slate-400 outline-none placeholder:text-[1rem] hover:border-slate-600 focus:border-slate-900 '
                                          placeholder='Nhập họ của bạn '
                                    />
                                    {error_first_name && (
                                          <span className='text-red-600'>{error_first_name.message}</span>
                                    )}
                              </div>
                              <div className='w-full sm:w-[50%] flex flex-col gap-[.5rem]'>
                                    <label
                                          htmlFor='last_name'
                                          className='text-[1.2rem] font-normal hover:cursor-pointer'
                                    >
                                          Tên của bạn
                                    </label>
                                    <input
                                          {...updateUserForm.register('user_last_name')}
                                          type='text'
                                          id='last_name'
                                          className='h-[2.8rem] px-[1rem] text-[1.2rem] rounded-md border-[.1rem] border-slate-400 outline-none placeholder:text-[1rem] hover:border-slate-600 focus:border-slate-900 '
                                          placeholder='Nhập tên của bạn '
                                    />
                                    {error_last_name && <span className='text-red-600'>{error_last_name.message}</span>}
                              </div>
                        </div>
                        <div className='flex flex-col gap-[.5rem]'>
                              <label htmlFor='email' className='text-[1.2rem] font-normal hover:cursor-pointer'>
                                    Email
                              </label>
                              <input
                                    {...updateUserForm.register('user_email')}
                                    type='text'
                                    id='email'
                                    className='h-[2.8rem] px-[1rem] text-[1.2rem] rounded-md border-[.1rem] border-slate-400 outline-none placeholder:text-[1rem] hover:border-slate-600 focus:border-slate-900 '
                                    placeholder='Nhập email của bạn '
                              />
                              {error_email && <span className='text-red-600'>{error_email.message}</span>}
                        </div>

                        <button type='submit' className='w-full h-[3rem] bg-slate-900 text-[#ffffff] rounded-md'>
                              Cập nhập
                        </button>
                  </form>
            </div>
      )
}

export default AccountSection
