import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import LoginForm from './pages/Login/LoginForm'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/login',
        element: <LoginForm />
      }
    ]
  }
])

export default router
