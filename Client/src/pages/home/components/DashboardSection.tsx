import ReactLogo from '../../../assets/images/tech/ReactLogo.png'
import TypescriptLogo from '../../../assets/images/tech/TypescriptLogo.png'
import ReduxToolkitLogo from '../../../assets/images/tech/ReduxToolkitLogo.png'
import ReactQueryLogo from '../../../assets/images/tech/ReactQueryLogo.svg'
import ReactHookFormLogo from '../../../assets/images/tech/ReactHookFormLogo.jpg'
import AxiosLogo from '../../../assets/images/tech/AxiosLogo.jpg'
import TailwindLogo from '../../../assets/images/tech/TailwindLogo.png'

import NodeJSLogo from '../../../assets/images/tech/NodeJsLogo.png'
import ExpressJSLogo from '../../../assets/images/tech/ExpressJsLogo.png'

import MongoDBLogo from '../../../assets/images/tech/MongoDbLogo.png'

const DashboardSection = () => {
      // const [count, setCount] = useState(0)

      return (
            <div className='w-full flex flex-col gap-[2rem] min-h-screen h-max'>
                  <p className='italic underline'>Các công nghệ được sử dụng</p>
                  <div className='flex flex-col gap-[2rem]'>
                        <h3 className='font-medium text-[1.8rem] underline'>Front End:</h3>
                        <div className='flex justify-center sm:justify-start gap-[4rem] h-max flex-wrap'>
                              <div className=' flex flex-col  items-center gap-[1rem] w-max'>
                                    <div className=' flex  flex-col sm:flex-row gap-[2rem]'>
                                          <img src={ReactLogo} alt='react' className='w-[10rem] h-[10rem]' />
                                          <img src={TypescriptLogo} alt='typescript' className='w-[10rem] h-[10rem]' />
                                    </div>
                                    <span className='italic text-[1.2rem] text-blue-700'>
                                          Ngôn ngữ và thư viện chính
                                    </span>
                              </div>

                              <div className=' flex flex-col items-center gap-[2rem] w-max'>
                                    <div className=' flex gap-[1rem]'>
                                          <img
                                                src={ReduxToolkitLogo}
                                                alt='redux-toolkit'
                                                className='w-[14rem] h-[10rem]'
                                          />
                                    </div>
                                    <span className='italic text-[1.2rem] text-blue-700'>Quán lý State global</span>
                              </div>

                              <div className=' flex flex-col items-center gap-[1rem] w-max'>
                                    <div className=' flex flex-col sm:flex-row gap-[2rem]'>
                                          <img src={AxiosLogo} alt='axios' className='w-[10rem] h-[10rem]' />
                                          <img src={ReactQueryLogo} alt='react-query' className='w-[10rem] h-[10rem]' />
                                    </div>
                                    <span className='italic text-[1.2rem] text-blue-700'>Xử lí call API từ server</span>
                              </div>
                              <div className=' flex flex-col items-center gap-[1rem] w-max'>
                                    <div className=' flex gap-[2rem]'>
                                          <img
                                                src={ReactHookFormLogo}
                                                alt='react-hook-form'
                                                className='w-[8rem] h-[6rem] sm:w-[14rem] sm:h-[10rem]'
                                          />
                                    </div>
                                    <span className='italic text-[1.2rem] text-blue-700'>Xử lí form</span>
                              </div>
                              <div className=' flex flex-col items-center gap-[1rem] w-max'>
                                    <div className=' flex gap-[2rem]'>
                                          <img src={TailwindLogo} alt='axios' className='w-[10rem] h-[10rem]' />
                                    </div>
                                    <span className='italic text-[1.2rem] text-blue-700'>Style Css</span>
                              </div>
                        </div>
                  </div>

                  <div className=''>
                        <h3 className='font-medium text-[1.8rem] underline'>Back End:</h3>
                        <div className='flex justify-center sm:justify-normal gap-[4rem] h-max flex-wrap'>
                              <div className='h-full flex flex-col items-center gap-[1rem] w-max'>
                                    <div className='h-full flex flex-col sm:flex-row gap-[2rem]'>
                                          <img src={NodeJSLogo} alt='NodeJs' className='w-[16rem] h-[10rem]' />
                                          <img src={TypescriptLogo} alt='typescript' className='w-[10rem] h-[10rem]' />
                                    </div>
                                    <span className='italic text-[1.2rem] text-blue-700'>
                                          Môi trường chạy và ngôn ngữ code chính
                                    </span>
                              </div>
                              <div className='h-full flex flex-col items-center gap-[1rem] w-max'>
                                    <div className='h-full flex gap-[1rem]'>
                                          <img src={ExpressJSLogo} alt='ExpressJS' className='w-[16rem] h-[10rem]' />
                                    </div>
                                    <span className='italic text-[1.2rem] text-blue-700'>Framework phía Server</span>
                              </div>
                        </div>
                  </div>

                  <div className='mt-[5rem] flex flex-col gap-[2rem]'>
                        <h3 className='font-medium text-[1.8rem] underline'>Database:</h3>
                        <div className='flex justify-center sm:justify-start gap-[8rem] h-[14rem] flex-wrap'>
                              <div className='h-full flex flex-col items-center gap-[2rem] w-max'>
                                    <div className='h-full flex gap-[1rem]'>
                                          <img
                                                src={MongoDBLogo}
                                                alt='redux-toolkit'
                                                className='w-[14rem] h-[10rem] min-h-full'
                                          />
                                    </div>
                                    <span className='italic text-[1.2rem] text-blue-700'>Cơ sở dữ liệu</span>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default DashboardSection
