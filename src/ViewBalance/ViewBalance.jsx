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
  const {user, userRole, username, password, userEmail, userId,clearUserData} = useUser();
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
React.useEffect(() => {
const userdetails={
  userID: userId,
  accountNo: 'axMMPPAJBMBS17', 
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
}, []);

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 400,
          height: 500, marginLeft: '30%', marginTop: 5, padding: 4, boxShadow: 19, borderRadius: 3, bgcolor: 'background.paper'
        }}>
               <h1 >View Balance</h1>

               <Typography variant="h6" sx={{ mb: 2, color: 'Black' }}>
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