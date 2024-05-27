import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login/LoginPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'
import RegisterPage from './pages/register/RegisterPage'
import HomePage from './pages/home/HomePage'
import DashboardSection from './pages/home/components/DashboardSection.tsx'
import AccountSection from './pages/home/components/AccountSection.tsx'

const App = () => {
      return (
            <>
                  <Routes>
                        <Route path='/' element={<HomePage />}>
                              <Route path='/dashboard' element={<DashboardSection />} />
                              <Route path='/account' element={<AccountSection />} />
                        </Route>

                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/register' element={<RegisterPage />} />

                        <Route path='*' element={<NotFoundPage />} />
                  </Routes>
            </>
      )
}

export default App
