import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import App from './App';
import { Routes, useNavigate,Route} from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';  
import Home from './Home';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Button variant="soft">Change mode</Button>;
  }

  return (
    <Select
      variant="soft"
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode);
      }}
      sx={{ width: 'max-content' }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}

export default function LoginPage(props) {
  const navigate = useNavigate();
  // State to manage login status
 const [isloggedin, setIsLoggedIn] = React.useState(false); 
 const [username, setUsername] = React.useState('');
 const [password, setPassword] = React.useState('');
  const { setUser, setToken, setUserRole,setUserId, setUserEmail, setUsername: setUsernameContext, setPassword: setPasswordContext } = useUser();

  const handleLogin = (event) => {
    event.preventDefault();
// setIsLoggedIn(true);

axios.get(`https://bmbapi.onrender.com/api/UserLoginDetail/VerifyLogin?username=${username}&password=${password}`, {
    })
    .then((response) => {
      if(response.status==200){
        navigate('/');
        setUser(response.data);
        setUserId(response.data.userID);
        setUsernameContext(response.data.username);
        setUserEmail(response.data.userEmail);
        console.log(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('userId', response.data.userID);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('userEmail', response.data.userEmail);
      }
      else{
        alert("Invalid Credentials");
      }
    });
  };

  return (
    <main>
      <CssVarsProvider {...props}>
        <ModeToggle />
        <CssBaseline />
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>User Name</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
            />
          </FormControl>
          <Button
          onClick={handleLogin}
           sx={{ mt: 1 /* margin top */ }}>Log in</Button>
            <Button variant="text" onClick={() => navigate('/Registration')}>New To BMB</Button>
        </Sheet>
      </CssVarsProvider>
    </main>
  );
}