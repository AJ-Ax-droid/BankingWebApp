import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useUser } from '../UserContext';
import config from '../config'; // Assuming you have a config file for API base URL
import axios from 'axios';

function ViewBalance() {
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [balance, setBalance] = useState(0);
  const {user, userRole, username, password, userEmail, userId,clearUserData, currentAccount} = useUser();
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
React.useEffect(() => {
if (!currentAccount || !currentAccount.accountNo) {
  return;
}
const userdetails={
  userID: userId,
  accountNo: currentAccount.accountNo, 
};
  // Fetch the user's balance from the API
  const fetchBalance = async () => {
   try {
    const response = await axios.get(`${config.apiBaseUrl}/api/UserAccountDetail/GetUserAccountBalanceByAccountNoAndUserId`, {
      params: {
        accountNo: userdetails.accountNo,
        userId: userdetails.userID
      }
    });
    if (response.status === 200) {
      setBalance(response.data);
     console.log(balance);
    }
   } catch (error) {
    console.error('Error fetching balance:', error);
   }
  };

  fetchBalance();
}, [currentAccount ]);

  return (
    <div className="centered-container">
    <Box className="Box-PaperBg">
               <h1 style={{ textAlign: 'center' }} >View Balance</h1>
               <Typography variant="h6" sx={{ mb: 2, justifyContent: 'center', display: 'flex',alignItems: 'center', gap: 1 }}>
                Your current balance is: ${balance.data}
               </Typography>
               
          {/* <IconButton
              size='large'
              // aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              // onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? (
                <VisibilityOff fontSize="large" />
              ) : (
                <Visibility fontSize="large" />
              )}
            </IconButton> */}
        
      </Box>
    </div>
  );
}
export default ViewBalance;