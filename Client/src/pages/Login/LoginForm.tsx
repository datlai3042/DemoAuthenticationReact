import { useForm } from 'react-hook-form'
// import LogoGoogle from '../../assets/images/icon_google.png'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import loginSchema from './login.schema'
import { useMutation } from '@tanstack/react-query'
import Auth from '../../services/auth.service'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../redux/auth.slice'
import { checkAxiosError, generateIdToast } from '../../utils/axiosError'
import { addToast } from '../../redux/toast.slice'
// import getOauthWithGoogle from '../../utils/0AuthGoogle'

const LoginForm = () => {
      const navigate = useNavigate()
      const dispatch = useDispatch()

      // const getOauthUrl = getOauthWithGoogle()

      const loginForm = useForm<Auth.LoginParam>({
            defaultValues: {
                  user_email: '',
                  user_password: ''
            },
            resolver: zodResolver(loginSchema)
      })

      const loginMutation = useMutation({
            mutationKey: ['register'],
            mutationFn: (data: Auth.LoginParam) => Auth.login(data),
            onSuccess: (res) => {
                  const { user } = res.data.metadata
                  localStorage.setItem('client-id', JSON.stringify(user._id))
                  dispatch(fetchUser({ user, isLogin: true }))
                  navigate('/')
            },
            onError: (res) => {
                  if (checkAxiosError<API.ResponseCommomApi<string>>(res)) {
                        const errorMessage = res.response?.data.metadata
                        console.log({ errorMessage })
                        dispatch(addToast({ type: 'ERROR', id: generateIdToast(), message: errorMessage as string }))
                  }
            }
      })

      console.log({ error: loginForm.formState.errors })
      const onSubmit = (data: Auth.LoginParam) => {
            loginMutation.mutate(data)
      }

      const error_email = loginForm.formState.errors.user_email
      const error_password = loginForm.formState.errors.user_password

      return (
            <div className='w-full sm:w-[70%] xl:w-[30rem] h-[45rem] sm:h-[50rem] xl:h-[40rem] px-[2rem] xl:px-0 flex flex-col items-center gap-[1rem]   '>
                  <h1 className='text-[2.4rem] font-semibold'>Đăng nhập</h1>

                  {/* <Link
                        to={getOauthUrl}
                        className='w-full h-[2.8rem] flex items-center justify-center gap-[1rem] bg-[#ffffff] rounded-md border-[.1rem] border-slate-200'
                  >
                        <img src={LogoGoogle} alt='' className='w-[1.5rem]' />
                        Đăng nhập với Google
                  </Link>

                  <span className='text-[.9rem] opacity-55'>OR</span> */}

                  <form
                        className='mt-[2rem] w-full flex flex-col  gap-[2rem] sm:gap-[3rem] xl:gap-[2rem]'
                        onSubmit={loginForm.handleSubmit(onSubmit)}
                  >
                        <div className='flex flex-col gap-[.5rem]'>
                              <label htmlFor='email' className='text-[1.2rem] font-medium hover:cursor-pointer'>
                                    Email
                              </label>
                              <input
                                    {...loginForm.register('user_email')}
                                    type='text'
                                    id='email'
                                    className='h-[2.8rem] p-[1rem] text-[1.2rem] rounded-md border-[.1rem] border-slate-400 outline-none placeholder:text-[1rem] hover:border-slate-600 focus:border-slate-900 '
                                    placeholder='Nhập email của bạn '
                              />
                              {error_email && <span className='text-red-600'>{error_email.message}</span>}
                        </div>

                        <div className='flex flex-col gap-[.5rem]'>
                              <label htmlFor='password' className='text-[1.2rem] font-medium hover:cursor-pointer'>
                                    Mật khẩu
                              </label>
                              <input
                                    {...loginForm.register('user_password')}
                                    type='password'
                                    id='password'
                                    className='h-[2.8rem] p-[1rem] text-[1.2rem] rounded-md border-[1px] border-slate-400 outline-none placeholder:text-[1rem]'
                                    placeholder='Nhập mật khẩu của bạn '
                              />
                              {error_password && <span className='text-red-600'>{error_password.message}</span>}
                        </div>
                        <button type='submit' className='w-full h-[3rem] bg-slate-900 text-[#ffffff] rounded-md'>
                              Đăng nhập
                        </button>
                  </form>

                  <div className='mt-[1rem] w-full h-[4rem] flex items-center justify-center gap-[.2rem] border-[.1rem] border-slate-400 rounded-md'>
                        <span>Bạn chưa có tài khoản?</span>
                        <Link to={'/register'} className='underline'>
                              đăng kí
                        </Link>
                  </div>
            </div>
      )
}

export default LoginForm
