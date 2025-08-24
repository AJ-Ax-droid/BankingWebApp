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
import { Input, InputAdornment } from '@mui/material';
import axios from 'axios';
import config from '../config';
import { useUser } from '../UserContext';
import AlertSnackBar from '../CommonUtils/AlertSnackbar';
import LinearProgress from '@mui/joy/LinearProgress';
import QRScanner from '../CommonUtils/QRScanner';
import '../CSS/utility.css';
import QrCodeIcon from '@mui/icons-material/QrCode';
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
  const { user, currentAccount } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAccouverifiedcolour, setIsAccouverifiedColor] = React.useState('primary');
  const [qrScannerVisible, setQrScannerVisible] = React.useState(false);
  const [qrData, setQrData] = React.useState("No QR detected");
  const [DebitTransactiondetails, setDebitTransactionDetails] = React.useState({
    isReceiverAccountVerifiedBMB: false,
    isQRCodeScanned: false,
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
  };

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

  const handleQRScan = (data) => {
    setQrData(data);
    setQrScannerVisible(false);
  };

  React.useEffect(() => {
    function parseUPI(qrString) {
      const url = new URL(qrString);
      const params = Object.fromEntries(url.searchParams.entries());
      return params;
    }

    if (qrData === "No QR detected") return;
    const parsedData = parseUPI(qrData);
    if (parsedData) {
      if (parsedData.isBMBPayment=="true" || parsedData.isBMBPayment==true) {
        console.log('Parsed UPI DataisBMB :', parsedData.isBMBPayment)
        setDebitTransactionDetails({
              ...DebitTransactiondetails,
              isReceiverAccountVerifiedBMB: true
            });
      }
      console.log('Parsed UPI Data:', parsedData.pa);
      setDebitTransactionDetails({
        ...DebitTransactiondetails,
        amountToSend:  0,
        receiverAccountNo: parsedData.pa || '',
        receiverAccountHolderName: parsedData.pn || '',
        isQRCodeScanned: true,
        isReceiverAccountVerifiedBMB: parsedData.isBMBPayment=="true" || parsedData.isBMBPayment==true
      });
    }
  }, [qrData]);

  if (qrScannerVisible) {
    return (
      <div className="centered-container">
        <Box className="Box-PaperBg">
          <QRScanner onScan={handleQRScan} />
          
        </Box>
      </div>
    );
  }

  return (
    <div className="centered-container">
      <Box className="Box-PaperBg">
        {snackbar.open && <AlertSnackBar message={snackbar.message} type={snackbar.type} />}
        <TextField
          id="ReceiverAccountNo"
          label="Enter Receiver Account No"
          variant="standard"
          required
          fullWidth
          onChange={handleReceiverAccountNoChange}
          value={DebitTransactiondetails.receiverAccountNo}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleVerifyAccount} loading={loading} disabled={DebitTransactiondetails.isReceiverAccountVerifiedBMB} variant='contained' size='small'>
                    <CheckCircleOutlineIcon color={DebitTransactiondetails.isReceiverAccountVerifiedBMB ? 'success' : 'action.active'} />
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />

        <TextField
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            },
          }}
          required
          id="ReceiverName"
          label="Enter Receiver Name"
          variant="standard"
          fullWidth
          onChange={handleReceiverNameChange}
          value={DebitTransactiondetails.receiverAccountHolderName}
        />

        <TextField
          required
          id="DebitAmount"
          type='text' 
          inputMode='decimal'
          label="Enter Debit Amount"
          variant="standard"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
              inputProps:{maxLength: 10}
            },
          }}
          // onChange={handleDebitAmountChange}
          onChange={(e)=>{
            const onlyNums = e.target.value.replace(/[^0-9.]/g, '');
            const parts = onlyNums.split('.');
            if(parts.length > 2){
              // More than one decimal point, ignore the input
              return;
            }
            setDebitTransactionDetails({
              ...DebitTransactiondetails,
              amountToSend: onlyNums
            });
          }}
          value={DebitTransactiondetails.amountToSend}
        />

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

        <Button
          sx={{ mt: 2, width: '60%' }}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          onClick={() => setQrScannerVisible(true)}
          disabled={isLoading}
          startIcon={<QrCodeIcon />}
        >
          Scan & Pay
        </Button>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {isLoading && <LinearProgress />}
        </Box>
      </Box>
    </div>
  );
}
