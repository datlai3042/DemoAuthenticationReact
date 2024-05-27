import LoginPage from '../Login/LoginPage'
import logoDat from '../../assets/images/logo.png'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { doChangeIsLogin, fetchUser } from '../../redux/auth.slice'
import { RootState } from '../../store'
import { LayoutDashboard, LogOut, User } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import DashboardSection from './components/DashboardSection'
import { useMutation, useQuery } from '@tanstack/react-query'
import UserService from '../../services/user.service'
import Auth from '../../services/auth.service'
// import { useSelector } from 'react-redux'
// import { RootState } from '../../store'

const HomePage = () => {
      const isLogin = useSelector((state: RootState) => state.auth.isLogin)
      const [authLogin, setAuthLogin] = useState(Cookies.get('isLogin'))
      const dispatch = useDispatch()
      const pathName = useLocation().pathname
      const user = useSelector((state: RootState) => state.auth.user) as User.UserSchema

      const getMeQuery = useQuery({
            queryKey: ['get-me'],
            queryFn: () => UserService.getMe(),
            enabled: !!authLogin
      })

      const logoutMutation = useMutation({
            mutationKey: ['logout'],
            mutationFn: () => Auth.logout(),
            onSuccess: () => {
                  dispatch(fetchUser({ user: null, isLogin: true }))
                  window.location.reload()
            }
      })

      useEffect(() => {
            console.log({ me: getMeQuery.data?.data.metadata.user })
            if (getMeQuery.isSuccess) {
                  const { user } = getMeQuery.data.data.metadata
                  dispatch(fetchUser({ user, isLogin: true }))
            }
      }, [getMeQuery.isSuccess, getMeQuery.data, dispatch])

      useEffect(() => {
            dispatch(doChangeIsLogin({ isLogin: authLogin === 'true' ? true : false }))
            setAuthLogin(Cookies.get('isLogin'))
      }, [isLogin, authLogin, dispatch])

      if (!authLogin) return <LoginPage />

      const onLogout = () => {
            logoutMutation.mutate()
      }

      const styleEffect = {
            pathActive: (condition: boolean) => {
                  if (condition) return 'bg-blue-400 text-white '
                  return 'bg-[#ffffff] text-slate-700 hover:bg-blue-100'
            }
      }

      return (
            <div className='flex flex-col min-h-screen h-max'>
                  <header className=' w-full h-[5rem] px-[1rem] flex items-center justify-between bg-[#ffffff] shadow'>
                        <div className='h-full flex items-center '>
                              <img
                                    src={logoDat}
                                    className='w-[5rem] h-[5rem] mx-[1.5rem] sm:mx-[2.5rem] '
                                    alt='Vite logo'
                              />
                              <p>Demo Authentication với React</p>
                        </div>
                        <div className='flex items-center gap-[.6rem]'>
                              <div className='w-[2rem] h-[2rem] flex items-center justify-center text-white bg-green-400 rounded-full'>
                                    {user?.user_email.charAt(0)}
                              </div>
                              <p>
                                    Hi <span>{user?.user_email}</span>
                              </p>
                        </div>
                  </header>
                  <div className='flex-1 w-full h-full  flex '>
                        <div className='w-[40%] xl:w-[15%] min-h-screen h-full py-[2rem] flex  flex-col border-r-[.1rem] border-slate-200 '>
                              <Link
                                    to={'/'}
                                    className={`${styleEffect.pathActive(pathName === '/')} p-[1rem] flex items-center gap-[.5rem]  `}
                              >
                                    <LayoutDashboard />
                                    <span>Dashboard</span>
                              </Link>
                              <Link
                                    to={'/account'}
                                    className={`${styleEffect.pathActive(pathName === '/account')} p-[1rem] flex items-center gap-[.5rem]   `}
                              >
                                    <User />
                                    <span>Thông tin cá nhân</span>
                              </Link>

                              <button
                                    className='p-[1rem] flex items-center gap-[.5rem] hover:bg-blue-100  '
                                    onClick={onLogout}
                              >
                                    <LogOut />
                                    <span>Đăng xuất</span>
                              </button>
                        </div>

                        <div className='w-[60%] xl:w-[85%] min-h-full p-[2rem] sm:p-[2rem_4rem] flex flex-col gap-[2rem]'>
                              <h2 className='font-medium text-[2rem]'>Demo Module Authentication với ReactJs</h2>
                              {pathName === '/' ? <DashboardSection /> : <Outlet />}
                        </div>
                  </div>
            </div>
      )
}

export default HomePage
