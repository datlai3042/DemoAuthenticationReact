import logoDat from '../../assets/images/logo.png'
import backgroudForm from '../../assets/images/backgoundFormRegister.jpg'
import RegisterForm from './RegisterForm'
const RegisterPage = () => {
      return (
            <>
                  <div className='w-full min-h-screen h-max bg-[#ffffff] flex'>
                        <div className=' w-[60%] bg-slate-200 min-h-full hidden xl:flex items-center '>
                              <img src={backgroudForm} alt='' className='w-full h-full object-cover' />
                        </div>
                        <div className='w-full xl:w-[40%]  flex flex-col gap-[2rem]'>
                              <header className=' w-full  h-[7.2rem] flex items-center bg-[#ffffff] border-b-[.1rem] border-slate-300'>
                                    <img src={logoDat} className='w-[7rem] h-[7rem] mx-[4rem] ' alt='Vite logo' />
                              </header>
                              <div className='mt-[2rem] sm:mt-[6rem] xl:mt-0 h-max flex justify-center '>
                                    <RegisterForm />
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default RegisterPage
