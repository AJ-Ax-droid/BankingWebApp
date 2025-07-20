import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function ViewBalance() {
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 400,
          height: 500, marginLeft: '30%', marginTop: 5,

          borderRadius: 1,
          bgcolor: 'primary.main',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}>
               <h1 >View Balance</h1>

               <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                Your current balance is: $1000
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