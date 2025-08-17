import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from './Home.jsx'
import LoginPage from './LoginPage.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CssVarsProvider } from '@mui/joy/styles';
import { Login } from '@mui/icons-material'
import { UserProvider } from './UserContext.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './CSS/App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <CssVarsProvider>
<ThemeProvider theme={theme}>

    <BrowserRouter basename="/BankingWebApp/">
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
</ThemeProvider>
    </CssVarsProvider>
  // </StrictMode>,
)
