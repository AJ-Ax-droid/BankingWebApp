import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/joy/LinearProgress';
import config from '../config'; // Assuming you have a config file for API base URL
import AlertSnackBar from '../CommonUtils/AlertSnackbar';

export default function Registration() {
  const [UserData, setUserData] = React.useState({
    FirstName: '',
    MiddleName: '',
    LastName: '',
    UserName: '',
    Password: '',
    Email: '',
    PhoneNumber: '',
    PanNumber: '',
    CurrentAddress: '',
    PermanentAddress: '',
    AccountType: ''
  });

  const navigate = useNavigate();
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', type: '' });

  const handleUserDataUpdate = (event) => {
    const { name, value } = event.target;
    setUserData({ ...UserData, [name]: value });
  };

  const handleSubmit =  (event) => {
    event.preventDefault();
    // Here you can handle the registration logic, e.g., sending data to an API
    if (UserData.Password !== UserData.ConfirmPassword) {
      alert('Passwords do not match!');
      return; // Stop submission if passwords don't match
    }
    if (snackbar.open) 
    {
      setSnackbar({ open: false, message: '', type: '' });
    }

    const now = new Date().toISOString();
    const registrationPayload = {
      user: {
        firstName: UserData.FirstName,
        lastName: UserData.LastName,
        address: UserData.CurrentAddress,
        emailID: UserData.Email,
        phoneNumber: UserData.PhoneNumber,
        isActive: true,
        createON: now,
        createdBy: 'NewUserRegistration',
        modifiedOn: null,
        modifiedBy: null,
      },
      userAccountDetais: {
        panNo: UserData.PanNumber,
        account_Type: UserData.AccountType,
        accountCreatedOn: now,
        firstName: UserData.FirstName,
        lastName: UserData.LastName,
      },
      userLoginDetails: {
        userName: UserData.UserName,
        password: UserData.Password,
        userEmail: UserData.Email,
      },
    };
    // Log the payload to console or send it to your API
  var responses=  axios.post(`${config.apiBaseUrl}/api/User`, registrationPayload)
      .then(async response => {
        if(response.status === 200){
          console.log('Registration successful:', response.data);
          setSnackbar({ open: true, message: 'Redirecting to login page for UserName: ' + response.data.userName, type: 'success' });
          await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay
          navigate('/LoginPage'); // Redirect to login page after successful registration
        }
        else{
          setSnackbar({ open: true, message: 'response.data', type: 'error' });
        }
      })
      .catch(error => {
        console.error('There was an error registering the user!', error);
        alert('Registration failed. Please try again.' );
      });

     // For debugging purposes, you can log the payload
    console.log('Registration Payload:', registrationPayload);
  };

  return (
    

    
       <Box
      component="form"
      
      sx={{ mr: 2, width: 600, height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, p: 4, boxShadow: 3, borderRadius: 3, bgcolor: 'background.paper' }}
      noValidate
      autoComplete="off"
      >
        {snackbar.open && <AlertSnackBar message={snackbar.message} type={snackbar.type} />}
        <form onSubmit={handleSubmit}>
      <Stack direction="column" spacing={2}>

        <Stack direction="row" spacing={2}>
             <TextField value={UserData.FirstName} slotProps={{ input: {inputProps:{maxLength: 10}} }} required onChange={handleUserDataUpdate} name="FirstName" id="standard-basic" label="FirstName" variant="standard" />
             <TextField value={UserData.MiddleName} slotProps={{input:{inputProps:{maxLength: 10}}}} required onChange={handleUserDataUpdate} name="MiddleName" id="standard-basic" label="MiddleName" variant="standard" />
            <TextField value={UserData.LastName} slotProps={{input:{inputProps:{maxLength: 10}}}} required onChange={handleUserDataUpdate} name="LastName" id="standard-basic" label="LastName" variant="standard" />
        </Stack>
        <Stack direction="row" spacing={2}>
             <TextField value={UserData.UserName} slotProps={{ input: {inputProps:{maxLength: 15}} }} required onChange={handleUserDataUpdate}  name="UserName" id="standard-basic" label="UserName" variant="standard" />
             <TextField value={UserData.Password}slotProps={{ input: {inputProps:{maxLength: 20}} }} required onChange={handleUserDataUpdate} type='password' name="Password" id="standard-basic" label="Password" variant="standard" />
            <TextField value={UserData.ConfirmPassword} slotProps={{ input: {inputProps:{maxLength: 20}} }} required onChange={handleUserDataUpdate} type='password' name="ConfirmPassword" id="standard-basic" label="ConfirmPassword" variant="standard" />
        </Stack>
        <Stack direction="row" spacing={2}>
            <TextField value={UserData.Email}slotProps={{ input: {inputProps:{maxLength: 20}} }} required onChange={handleUserDataUpdate} type='email' name="Email" id="standard-basic" label="Email" variant="standard" />
             <TextField value={UserData.PhoneNumber}slotProps={{ input: {inputProps:{maxLength: 10}} }} required onChange={handleUserDataUpdate} type='text' inputMode='numeric' name="PhoneNumber" id="standard-basic" label="Phone Number" variant="standard" />
             <TextField value={UserData.PanNumber} slotProps={{ input: {inputProps:{maxLength: 10}} }} required onChange={handleUserDataUpdate} name="PanNumber" id="standard-basic" label="PanNumber" variant="standard" />
        </Stack>
      <Stack direction="row" spacing={2}>
      <TextField value={UserData.CurrentAddress}slotProps={{ input: {inputProps:{maxLength: 40}} }} required onChange={handleUserDataUpdate} name="CurrentAddress" id="standard-basic" label="CurrentAddress" variant="standard" />
      <TextField value={UserData.PermanentAddress}slotProps={{ input: {inputProps:{maxLength: 40}} }} onChange={handleUserDataUpdate} name="PermanentAddress" id="standard-basic" label="PermanentAddress" variant="standard" />
      </Stack>
        <TextField value={UserData.AccountType}slotProps={{ input: {inputProps:{maxLength: 10}} }} required onChange={handleUserDataUpdate} name="AccountType" id="standard-basic" label="Account Type"  style={{ flexGrow: 1, width: '25ch', justifyContent: 'flex-end' ,alignItems: 'center'}} variant="standard" />
        <Button type='submit' variant="contained" color="primary" style={{ marginTop: '16px', width: '25ch', display: 'flex', justifyContent: 'center', alignItems: 'center', }} >
          Register with BMB
        </Button>
        <Button variant="text" onClick={() => navigate('/LoginPage')}>Already have an account? Login</Button>
      </Stack>
    </form>
    </Box>
  );
}
