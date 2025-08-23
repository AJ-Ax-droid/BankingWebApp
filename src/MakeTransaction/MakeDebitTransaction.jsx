import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import config from '../config';
import { useUser } from '../UserContext'; // Assuming you have a UserContext for user data
import AlertSnackBar from '../CommonUtils/AlertSnackbar';
import LinearProgress from '@mui/joy/LinearProgress';

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

export default function MakeDebitTransaction() {

  const [loading, setLoading] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', type: '' });
  const { user, currentAccount } = useUser(); // Assuming you have a UserContext for user data
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAccouverifiedcolour, setIsAccouverifiedColor] = React.useState('primary');
  const [DebitTransactiondetails, setDebitTransactionDetails] = React.useState({
    isReceiverAccountVerifiedBMB: false,
    receiverAccountNo: "",
    receiverAccountHolderName: "",
    senderUserID: user?.userID || 0,
    senderAccountNo: currentAccount.accountNo || "",
    senderAccoundHolderName: user?.firstName + " " + user?.lastName || "",
    amountToSend: 0
  });


  const handleDebitAmountChange = (event) => {
    setDebitTransactionDetails({
      ...DebitTransactiondetails,
      amountToSend: event.target.value
    });
    
  };
  const handleReceiverAccountNoChange = (event) => {
    setDebitTransactionDetails({
      ...DebitTransactiondetails,
      receiverAccountNo: event.target.value
    });
  }
  const handleReceiverNameChange = (event) => {
    setDebitTransactionDetails({
      ...DebitTransactiondetails,
      receiverAccountHolderName: event.target.value
    });
  };
  const handleDebitTransaction = (event) => {
    event.preventDefault();
  };

  const handleVerifyAccount = (event) => {
    event.preventDefault();
    setLoading(true);
    axios.get(`${config.apiBaseUrl}/api/UserAccountDetail/IsAccountExistinBMB?accountNo=${DebitTransactiondetails.receiverAccountNo}`)
      .then(response => {
        if (response.status === 200) {
          
          console.log('Account verification successful:', response.data);
          if (!response.data.isSuccess) {
            setSnackbar({ open: true, message: response.data.message || 'Account verification failed!', type: 'error' });
          } else {
            setDebitTransactionDetails({
              ...DebitTransactiondetails,
              isReceiverAccountVerifiedBMB: true
            });
          }
        } else {
          console.error('Account verification failed:', response.data);
          setSnackbar({ open: true, message: 'Account verification failed!', type: 'error' });
        }
      })
      .catch(error => {
        console.error('Error occurred while verifying account:', error);
        setSnackbar({ open: true, message: 'Account verification failed!', type: 'error' });
        
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSendMoney = (event) => {
    event.preventDefault();
    setSnackbar({ open: false });
    setIsLoading(true);
    axios.post(`${config.apiBaseUrl}/api/TransactionDetail/TransferAmmount`, {
      ...DebitTransactiondetails
    })
      .then(response => {
        if (response.status === 200) {
         if (!response.data.isSuccess) {
            setSnackbar({ open: true, message: response.data.message || 'Transaction failed!', type: 'error' });
          } else {
            setSnackbar({ open: true, message: response.data.message, type: 'success' });
          }
        } else {
          console.error('Transaction failed:', response.data);
          setSnackbar({ open: true, message: 'Transaction failed!', type: 'error' });
        }
      })
      .catch(error => {
        console.error('Error occurred while making transaction:', error);
        setSnackbar({ open: true, message: 'Transaction failed!', type: 'error' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 3 }}>
      {snackbar.open && <AlertSnackBar message={snackbar.message} type={snackbar.type} />}
      <Box
        component="form"
        sx={{ width: 400, height: 350, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, p: 4, boxShadow: 3, borderRadius: 3, bgcolor: 'background.paper' }}
        noValidate
        autoComplete="off"
      >

        <Box sx={{ display: 'flex', alignItems: 'flex-end',ml: 5 }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            id="ReceiverAccountNo"
            label="Enter Receiver Account No"
            variant="standard"
            required
            onChange={handleReceiverAccountNoChange}
            value={DebitTransactiondetails.receiverAccountNo}

          />
          <Tooltip title="Click Verify Account number">
            <IconButton onClick={handleVerifyAccount} loading={loading} disabled={DebitTransactiondetails.isReceiverAccountVerifiedBMB} >
              <CheckCircleOutlineIcon color={DebitTransactiondetails.isReceiverAccountVerifiedBMB ? 'success' : 'action.active'} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="ReceiverName"
            label="Enter Receiver Name"
            variant="standard"
            onChange={handleReceiverNameChange}
            value={DebitTransactiondetails.receiverAccountHolderName}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <CurrencyRupeeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="DebitAmount"
            type='number'
            label="Enter Debit Amount"
            variant="standard"
            onChange={handleDebitAmountChange}
            value={DebitTransactiondetails.amountToSend}
          />
        </Box >
        <Button
          sx={{ mt: 2, width: '60%' }}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          onClick={handleSendMoney}
          disabled={isLoading}
          startIcon={<PaymentIcon />}
        >
          Send Money
        </Button>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {isLoading && <LinearProgress />}
        </Box>
      </Box>
        
    </Box>
  );
}
