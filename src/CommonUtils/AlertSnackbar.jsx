import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';

const AlertSnackBar = ({ message, type }) => {
    const [open, setOpen] = React.useState(true);
    console.log("AlertSnackBar rendered with message:", message, "and type:", type);
  return (
    <Box sx={{ width: '10%' }}>
      <Snackbar 
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={message}
        onClose={() => {
            setOpen(false);
         }}
      >
        <Alert onClose={() => {}} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AlertSnackBar;