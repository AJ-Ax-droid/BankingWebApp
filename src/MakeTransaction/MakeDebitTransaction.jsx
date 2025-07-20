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
            id="ReceiverAccountNo"
            label="Enter Receiver Account No"
            variant="standard"
            required
          />
          <Tooltip title="Click Verify Account number">
            <IconButton onClick={() => setLoading(true)} loading={loading} >
              <CheckCircleOutlineIcon />
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
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <CurrencyRupeeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            required
            id="DebitAmount"
            label="Enter Debit Amount"
            variant="standard"
          />
        </Box >
        <Button
          sx={{ mt: 2, width: '60%' }}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<PaymentIcon />}
        >
          Send Money
        </Button>
      </Box>
    </Box>
  );
}
