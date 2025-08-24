import * as React from 'react';
import { DataGrid,Toolbar, ToolbarButton } from '@mui/x-data-grid';
// import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import config from '../config'; // Assuming you have a config file for API base URL
import axios from 'axios';
import { useUser } from '../UserContext'; // Assuming you have a UserContext for user data

function CustomToolbar() {
  // Placeholder toolbar, you can add your own export/print logic here if needed
  return (
    <Toolbar>
      <Tooltip fontWeight="medium" >
        Toolbarasdfasdf
      </Tooltip>

      <Tooltip title="Download as CSV">
        <span>
          <FileDownloadIcon fontSize="small" />
        </span>
      </Tooltip>
      <Tooltip title="Print">
        <span>
          <PrintIcon fontSize="small" />
        </span>
      </Tooltip>
    </Toolbar>
  );
}


// Mock columns and rows for DataGrid
const columns = [
  { field: 'transactionDate', headerName: 'Date', flex: 1, align: 'center', headerAlign: 'center' },
  // { field: 'transactionID', headerName: 'Naration', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'transactionID', headerName: 'Transaction ID', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'transactionBy', headerName: 'Transaction By', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'transactionTo', headerName: 'Transaction To', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'transactionType', headerName: 'Transaction Type', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'amountTrasacted', headerName: 'Amount', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'clearBalance', headerName: 'Clear Balance', flex: 1, align: 'center', headerAlign: 'center' },
  { field: 'transactionStatus', headerName: 'Transaction Status', flex: 1, align: 'center', headerAlign: 'center' },
];

// const rows = [
//   { Transactionid: 1, TransactionBy: 'Mohan', TransactionDate: '2025-07-01', TransactionType: 'Deposit', TransactionAmount: 1000, ClearBalance: 1000, TransactionStatus: 'Completed' },
//   { Transactionid: 2, TransactionBy: 'Ajay', TransactionDate: '2025-07-05', TransactionType: 'Withdrawal', TransactionAmount: -200, ClearBalance: 800, TransactionStatus: 'Completed' },
//   { Transactionid: 3, TransactionBy: 'Ramesh', TransactionDate: '2025-07-10', TransactionType: 'Deposit', TransactionAmount: 500, ClearBalance: 1300, TransactionStatus: 'Completed' },
//   { Transactionid: 4, TransactionBy: 'Suresh', TransactionDate: '2025-07-15', TransactionType: 'Payment', TransactionAmount: -300, ClearBalance: 1000, TransactionStatus: 'Completed' },
//   { Transactionid: 5, TransactionBy: 'Dhanajay', TransactionDate: '2025-07-20', TransactionType: 'Deposit', TransactionAmount: 700, ClearBalance: 1700, TransactionStatus: 'Completed' },
// ];

export default function GridExportTrigger() {

  const [rows, setRows] = React.useState([]);
  const { user, currentAccount } = useUser(); // Assuming you have a UserContext for user data
React.useEffect(() => {
  // Placeholder for any side effects or data fetching

axios.get(`${config.apiBaseUrl}/api/TransactionDetail/GetAllTransactionDetailsByAccountNumber/${currentAccount.accountNo}`)
    .then(response => {
      console.log('Data fetched successfully:', response.data);
      setRows(response.data); // Assuming response.data is an array of transaction objects
      // Process the data as needed
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    console.log('Data fetchedsss=====================================d successfully:', rows);

  // This effect can be used for any side effects or data fetching if needed
}, []);




  return (
    <Box sx={{ width: '100%', mt: 4, px: 0, pl: 4, pr: 4 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.transactionID}
        pageSize={5}
        components={{ Toolbar: CustomToolbar }}
        sx={{ border: 5, borderColor: 'divider', width: '100%' }}
        showToolbar
        
      />
    </Box>
  );
}