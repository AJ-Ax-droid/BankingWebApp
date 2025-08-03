import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function MakeCreditTransaction() 
{
  const [creditAmount, setCreditAmount] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

const handleCreditTransaction = (event) => {
  event.preventDefault();
  // Logic to handle credit transaction submission
  console.log('Credit Transaction Submitted');
  axios.post('/api/credit-transaction', {
    // Include necessary data for the credit transaction
  })
  .then(response => {
    if (response.status === 200) {
      console.log('Transaction successful:', response.data);
      // Optionally, navigate to a different page or show a success message
    } else {
      console.error('Transaction failed:', response.data);
    }
  })
  .catch(error => {
    console.error('Error processing transaction:', error);
  });
}

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        component="form"
        sx={{ width: 400, height: 350, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, p: 4, boxShadow: 3, borderRadius: 3, bgcolor: 'background.paper' }}
        noValidate
        autoComplete="off"
      >
        
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id="CreditTransactionUserName"
          label="Enter Your Name"
          variant="standard"
          required
        />
          </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <CurrencyRupeeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="CreditAmount"
            label="Amount to Credit"
            variant="standard"
          />
          


        </Box >
        <Button
          sx={{ mt: 2, width: '60%' }}
          component="label"
          variant="outlined"
          color="primary"
          onClick={handleCreditTransaction}
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<AddIcon />}
        >
          Add Money
        </Button>
      </Box>
    </Box>
  );
}
