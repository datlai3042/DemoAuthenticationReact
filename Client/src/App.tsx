import { Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardPage from './pages/dashboard/DashboardPage'
import LoginPage from './pages/Login/LoginPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import RegisterPage from './pages/register/RegisterPage'

const App = () => {
      return (
            <>
                  <Routes>
                        <Route path='/' element={<DashboardPage />} />
                        <Route path='/dashboard' element={<DashboardPage />} />

                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />

                        <Route path='*' element={<NotFoundPage />} />
                  </Routes>
            </>
      )
}

export default App
