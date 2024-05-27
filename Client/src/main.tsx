import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from './store.ts'
import ToastContainer from './components/toast/ToastContainer.tsx'

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } } })

ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
            <BrowserRouter>
                  <QueryClientProvider client={queryClient}>
                        <Provider store={store}>
                              <App />
                              <ToastContainer />
                        </Provider>
                  </QueryClientProvider>
            </BrowserRouter>
      </React.StrictMode>
)
