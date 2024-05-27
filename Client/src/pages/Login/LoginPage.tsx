import logoDat from '../../assets/images/logo.png'
import backgroudForm from '../../assets/images/backgoundForm2.jpg'
import LoginForm from './LoginForm'
const LoginPage = () => {
      return (
            <>
                  <div className='w-full min-h-screen h-max bg-[#ffffff] flex'>
                        <div className='w-full xl:w-[40%] h-[7rem]  flex flex-col gap-[2rem]'>
                              <header className=' w-full flex items-center bg-[#ffffff] border-b-[.1rem] border-slate-300'>
                                    <img src={logoDat} className='w-[7rem] h-[7rem] mx-[4rem] ' alt='Vite logo' />
                              </header>
                              <div className='mt-[2rem] sm:mt-[6rem] xl:mt-0 flex justify-center '>
                                    <LoginForm />
                              </div>
                        </div>
                        <div className=' w-[60%] bg-slate-200 min-h-full hidden xl:flex items-center '>
                              <img src={backgroudForm} alt='' className='w-full h-full object-cover' />
                        </div>
                  </div>
            </>
      )
}

export default LoginPage
