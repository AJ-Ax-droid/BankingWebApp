import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from './Home.jsx'
import LoginPage from './LoginPage.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Login } from '@mui/icons-material'
import { UserProvider } from './UserContext.jsx'
import './CSS/App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/BankingWebApp/">
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
