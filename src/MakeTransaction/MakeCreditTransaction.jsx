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
import config from '../config';
import { useUser } from '../UserContext'; // Assuming you have a UserContext for user data
import AlertSnackBar from '../CommonUtils/AlertSnackbar';
import LinearProgress from '@mui/joy/LinearProgress';
import { Snackbar } from '@mui/material';
import { Input, InputAdornment } from '@mui/material';


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

export default function MakeCreditTransaction() {
  const [creditAmount, setCreditAmount] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', type: '' });
  const { user, currentAccount } = useUser(); // Assuming you have a UserContext for user data

  const CreditTransactiondetails = {
    accountNO: currentAccount.accountNo || "string",
    userID: user?.userID || 0,
    amount: creditAmount || 0,
    transactionType: "CREDIT",
    description: "Adding money to account",
    transactionDate: new Date().toISOString(),
    transactionBy: user?.firstName + " " + user?.lastName || "string",
    transactionStatus: "Pending"
  };

  const handleCreditAmountChange = (event) => {
    setCreditAmount(event.target.value);
  };

  const handleCreditTransaction = (event) => {
    event.preventDefault();
    if (snackbar.open) 
    {
      setSnackbar({ open: false, message: '', type: '' });
    }
    console.log('Credit Transaction Submitted');
    setIsLoading(true);
    axios.post(`${config.apiBaseUrl}/api/TransactionDetail/MakeCreditTransactioninAccount`, {
      ...CreditTransactiondetails
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Transaction successful:', response.data);
          if (!response.data) {
            setSnackbar({ open: true, message: response.data || 'Transaction failed!', type: 'error' });
          } else {
            setSnackbar({ open: true, message: response.data, type: 'success' });
          }
        } else {
          console.error('Transaction failed:', response.data);
          setSnackbar({ open: true, message: 'Transaction failed!', type: 'error' });
        }
      })
      .catch(error => {
        console.error('Error processing transaction:', error);
        setSnackbar({ open: true, message: 'Error processing transaction!', type: 'error' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    
    <div className="centered-container">
    <Box className="Box-PaperBg">
       {snackbar.open && <AlertSnackBar message={snackbar.message} type={snackbar.type} />}
          <TextField
            id="CreditTransactionUserName"
            label="Enter Your Name"
            variant="standard"
            required
            fullWidth
            value={user?.firstName + " " + user?.lastName || ''}
            InputProps={{
              readOnly: true,
            }}
            slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            },
          }}
          />
          <TextField
            required
            type='text'
            inputMode='decimal'
            fullWidth
            slotProps={{ input: {
               startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
              inputProps: { maxLength:7 } } }}
            id="CreditAmount"
            label="Amount to Credit"
            variant="standard"
            
            value={creditAmount}
            onChange={handleCreditAmountChange}
            
          />
        <Button
          sx={{ mt: 2, width: '60%' }}
          component="label"
          variant="outlined"
          color="primary"
          onClick={handleCreditTransaction}
          role={undefined}
          tabIndex={-1}
          startIcon={<AddIcon />}
        >
          Add Money
        </Button>
        {isLoading && <LinearProgress sx={{ width: '100%', backgroundColor: 'transparent' }} />}
      </Box>
    </div>
  );
}
