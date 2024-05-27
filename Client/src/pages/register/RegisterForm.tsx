import { useForm } from 'react-hook-form'
// import LogoGoogle from '../../assets/images/icon_google.png'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import registerSchema from './register.schema'
import { useMutation } from '@tanstack/react-query'
import Auth from '../../services/auth.service'
import { fetchUser } from '../../redux/auth.slice'
import { useDispatch } from 'react-redux'
import { checkAxiosError, generateIdToast } from '../../utils/axiosError'
import { addToast } from '../../redux/toast.slice'

const RegisterForm = () => {
      const navigate = useNavigate()
      const dispatch = useDispatch()

      const registerForm = useForm<Auth.RegisterParam>({
            defaultValues: {
                  user_email: '',
                  user_password: '',
                  user_first_name: '',
                  user_last_name: ''
            },
            resolver: zodResolver(registerSchema)
      })

      const registerMutation = useMutation({
            mutationKey: ['register'],
            mutationFn: (data: Auth.RegisterParam) => Auth.register(data),
            onSuccess: (res) => {
                  const { user } = res.data.metadata
                  localStorage.setItem('client-id', JSON.stringify(user._id))
                  dispatch(fetchUser({ user, isLogin: true }))

                  navigate('/')
            },
            onError: (res) => {
                  if (checkAxiosError<API.ResponseCommomApi<string>>(res)) {
                        const errorMessage = res.response?.data.metadata
                        dispatch(addToast({ type: 'ERROR', id: generateIdToast(), message: errorMessage as string }))
                  }
            }
      })

      console.log({ error: registerForm.formState.errors })
      const onSubmit = (data: Auth.RegisterParam) => {
            registerMutation.mutate(data)
      }
      const error_email = registerForm.formState.errors.user_email
      const error_password = registerForm.formState.errors.user_password
      const error_last_name = registerForm.formState.errors.user_last_name
      const error_first_name = registerForm.formState.errors.user_first_name

      return (
            <div className='w-full sm:w-[70%] xl:w-[30rem] min-h-[45rem] sm:min-h-[50rem] xl:min-h-[45rem] h-max mb-[2rem] px-[2rem] xl:px-0 flex flex-col items-center gap-[1rem]   '>
                  <h1 className='text-[2.4rem] font-semibold'>Đăng kí</h1>

                  {/* <button className='w-full h-[2.8rem] flex items-center justify-center gap-[1rem] bg-[#ffffff] rounded-md border-[.1rem] border-slate-200'>
                        <img src={LogoGoogle} alt='' className='w-[1.5rem]' />
                        Đăng nhập bằng Google
                  </button>

                  <span className='text-[.9rem] opacity-55'>Hoặc</span> */}

                  <form
                        className='mt-[2rem] w-full flex flex-col  gap-[2rem] sm:gap-[3rem] xl:gap-[1.4rem]'
                        onSubmit={registerForm.handleSubmit(onSubmit)}
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
                                          {...registerForm.register('user_first_name')}
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
                                          {...registerForm.register('user_last_name')}
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
                                    {...registerForm.register('user_email')}
                                    type='text'
                                    id='email'
                                    className='h-[2.8rem] px-[1rem] text-[1.2rem] rounded-md border-[.1rem] border-slate-400 outline-none placeholder:text-[1rem] hover:border-slate-600 focus:border-slate-900 '
                                    placeholder='Nhập email của bạn '
                              />
                              {error_email && <span className='text-red-600'>{error_email.message}</span>}
                        </div>
                        <div className='flex flex-col gap-[.5rem]'>
                              <label htmlFor='password' className='text-[1.2rem] font-normal hover:cursor-pointer'>
                                    Mật khẩu
                              </label>
                              <input
                                    {...registerForm.register('user_password')}
                                    type='password'
                                    id='password'
                                    className='h-[2.8rem] px-[1rem] text-[1.2rem] rounded-md border-[1px] border-slate-400 outline-none placeholder:text-[1rem]'
                                    placeholder='Nhập mật khẩu của bạn '
                              />
                              {error_password && <span className='text-red-600'>{error_password.message}</span>}
                        </div>
                        <button type='submit' className='w-full h-[3rem] bg-slate-900 text-[#ffffff] rounded-md'>
                              Đăng kí
                        </button>
                  </form>

                  <div className='mt-[1rem] w-full h-[4rem] flex items-center justify-center gap-[.2rem] border-[.1rem] border-slate-400 rounded-md'>
                        <span>Bạn đã có tài khoản?</span>
                        <Link to={'/login'} className='underline'>
                              đăng nhập
                        </Link>
                  </div>
            </div>
      )
}

export default RegisterForm
