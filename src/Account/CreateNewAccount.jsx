import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useUser } from '../UserContext';
import config from '../config';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IconButton, Input, InputAdornment } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Password } from '@mui/icons-material';
import axios from 'axios';

export default function CreateNewAccount() {
  const [open, setOpen] = React.useState(false);
  const { user, userId, currentAccount } = useUser();
  const [error, setError] = React.useState(null);
  const [isEmailVerified, setIsEmailVerified] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [userdetail, setUserDetail] = React.useState({
    email: '',
    accountType: 'Saving',
    Password: ''
  });
  const createAccountPayload = {
    userID: user?.userID || 0,
    account_Type: userdetail.accountType || 'Saving',
    panNo: currentAccount?.panNo || 'string',
    accountCreatedOn: new Date().toISOString(),
    firstName: user?.firstName || 'string',
    lastName: user?.lastName || 'string',

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!isEmailVerified) {
      setError("Please verify your email before creating an account.");
      return;
    }
    // alert(`Creating account for email: ${userdetail.email}`);
    axios.post(`${config.apiBaseUrl}/api/UserAccountDetail/CreateUserAccountDetails`, {
      ...createAccountPayload
    })
    .then(response => {
      // Handle success
      console.log('Account created successfully:', response.data);
    })
    .catch(error => {
      // Handle error
      console.error('Error creating account:', error);
    });

    handleClose();
  };
 const handleuserdatachange = (event) => {
    const { name, value } = event.target;
    setUserDetail({ ...userdetail, [name]: value });
  };
  const handleemailverification = () => {
    // Simulate email verification process
    if (userdetail.email === user.emailID) {
      setIsEmailVerified(true);
      setError(null);
    } else {
      setError('Invalid email address');
      setIsEmailVerified(false);
    }
  };

  return (

    <form onSubmit={handleSubmit}>
      <TextField
        margin="dense"
        id="name"
        name="name"
        type="text"
        fullWidth
        defaultValue={user?.firstName + " " + user?.lastName || "string"}
        variant="standard"
        disabled={true}
        
      />
      <TextField
        autoFocus
        required
        margin="dense"
        id="email"
        name="email"
        label="Confirm Email Address"
        type="email"
        fullWidth
        error={!!error}
        helperText={error}
        value={userdetail.email}
        variant="standard"
        onChange={handleuserdatachange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleemailverification} variant='contained'  size='small' color={isEmailVerified ? 'success' : 'default'} ><CheckCircleIcon /></IconButton>
              </InputAdornment>
            )
          }
        }}
      />
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        required
        value={userdetail.accountType}
        name="accountType"
        label="Account Type"
        fullWidth
        onChange={handleuserdatachange}
      >
        <MenuItem value={'Saving'}>Saving</MenuItem>
        <MenuItem value={'Current'}>Current</MenuItem>

      </Select>
      <Button onClick={handleSubmit} type="submit" variant="contained" color="primary" style={{ marginTop: '16px', width: '25ch', display: 'flex', justifyContent: 'center', alignItems: 'center', }} >
        Create Account
      </Button>
    </form>
  );
}