import logoDat from '../../assets/images/logo.png'

const DashboardPage = () => {
      // const [count, setCount] = useState(0)

      return (
            <div className='flex flex-col min-h-screen h-max'>
                  <header className=' w-full h-[5rem] flex items-center bg-[#ffffff] shadow'>
                        <img src={logoDat} className='w-[5rem] h-[5rem] mx-[1.5rem] sm:mx-[2.5rem] ' alt='Vite logo' />
                        <p>Demo Authentication với React</p>
                  </header>
                  <div className='flex-1 w-full h-full px-[2rem] flex bg-gray-950'>
                        <div className='w-[10%] min-h-full bg-red-800'></div>
                        <div className='w-[90%] min-h-full bg-blue-800'></div>
                  </div>
            </div>
      )
}

export default DashboardPage
