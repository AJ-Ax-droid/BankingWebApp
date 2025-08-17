import * as React from 'react';
import config from './config'; // Assuming you have a config file for API base URL
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/joy/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import InfoIcon from '@mui/icons-material/Info';
import { useUser } from './UserContext';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
} from '@toolpad/core/Account';
import CreateNewAccount from './Account/CreateNewAccount';

import { DemoProvider } from '@toolpad/core/internal';
import ViewBalance from './ViewBalance/ViewBalance';
import MakeCreditTransaction from './MakeTransaction/MakeCreditTransaction';
import MakeDebitTransaction from './MakeTransaction/MakeDebitTransaction';
import ViewStatement from './ViewStatement/ViewStatement';
import CustomerServices from './CustomerServices/CustomerServices';
import AboutUs from './AboutUs/AboutUs';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import { Alert } from '@mui/material';
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Browse Services',
  },
  {
    segment: 'ViewBalance',
    title: 'View Balance',
    icon: <AccountBalanceWalletIcon />,
  },
  {
    segment: 'MakeTransaction',
    title: 'Make Transaction',
    icon: <PaymentIcon />,
    children: [
      {
        segment: 'MakeCreditTransaction',
        title: 'Make Credit Transaction',
        icon: <AddIcon />,
      },
      {
        segment: 'MakeDebitTransaction',
        title: 'Make Debit Transaction',
        icon: <RemoveIcon />,
      },
    ],

  },
  {
    segment: 'ViewStateMent',
    title: 'view StateMent',
    icon: <ReceiptLongIcon />,
  },
  {
    segment: 'CustomerService',
    title: 'Customer service',
    icon: <MiscellaneousServicesIcon />,
  },
  {
    segment: 'AboutUs',
    title: 'About us',
    icon: <InfoIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function CustomToolbarActions() {
  return (
    <Stack direction="row" alignItems="center">
      <ThemeSwitcher />
    </Stack>
  );
}
function Home(props) {
  const { user, userRole, username, password, userEmail, userId, clearUserData, UserAccountDetails, setUserAccountDetails, setCurrentAccount, currentAccount } = useUser();
  function DemoPageContent({ pathname }) {

    if (pathname === '/dashboard' || pathname === '/ViewBalance') {
      return (
        <ViewBalance />
      )
    }
    else if (pathname === '/MakeTransaction/MakeCreditTransaction') {
      return (
        <MakeCreditTransaction />
      );
    }
    else if (pathname === '/MakeTransaction/MakeDebitTransaction') {
      return (
        <MakeDebitTransaction />
      );
    }
    else if (pathname === '/ViewStateMent') {
      return (
        <ViewStatement />
      );
    }
    else if (pathname === '/CustomerService') {
      return (
        <CustomerServices />
      );
    }
    else if (pathname === '/AboutUs') {
      return (
        <AboutUs />
      );
    }
    return (
      <Box
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography>Dashboard content for {pathname}</Typography>
      </Box>
    );
  }
  React.useEffect(() => {
    console.log('Fetching user account details for userId:', userId);
    const getUserAccountDetails = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/api/UserAccountDetail/GetUserAccountDetailsByUserID/${userId}`);
        if (response.status === 200) {
          console.log('UserAccountDetails fetched successfully Response 200:', response.data);
          if (Array.isArray(response.data) && response.data.length > 0) {
            console.log('UserAccountDetails inside array check (Array):', response.data);
            if (JSON.stringify(UserAccountDetails) !== JSON.stringify(response.data)) {
              console.log('Updating UserAccountDetails (Array):', response.data);
              setUserAccountDetails(response.data);
              setCurrentAccount(response.data[0]);
            }
          } else if (response.data && typeof response.data === 'object') {
            if (JSON.stringify(UserAccountDetails) !== JSON.stringify([response.data])) {
              console.log('Updating UserAccountDetails (Object):', response.data);
              setUserAccountDetails([response.data]); // Wrap object in an array for consistency
              setCurrentAccount(response.data);
            }
          } else {
            console.error('No account details found');
            setCurrentAccount(null);
          }
        } else {
          console.error('Failed to fetch account details');
        }
      } catch (error) {
        console.error('Error fetching user account details:', error);
        alert('Error fetching user account details');
        setCurrentAccount(null);
      }
    };
    getUserAccountDetails();
  }, [userId]); // Removed UserAccountDetails from dependencies

// if (UserAccountDetails === null || UserAccountDetails.length === 0||UserAccountDetails===undefined) {
//      return (
//     <div>
//       Waiting.....
//       {/* <Backdrop
//         sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
//         open={true}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop> */}
//     </div>
//   );
//   }


  
  DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
  };

  function AccountSidebarPreview(props) {
    const { handleClick, open, mini } = props;
    return (
      <Stack direction="column" p={0}>
        <Divider />
        <AccountPreview
          variant={mini ? 'condensed' : 'expanded'}
          handleClick={handleClick}
          open={open}
        />
      </Stack>
    );
  }

  AccountSidebarPreview.propTypes = {
    /**
     * The handler used when the preview is expanded
     */
    handleClick: PropTypes.func,
    mini: PropTypes.bool.isRequired,
    /**
     * The state of the Account popover
     * @default false
     */
    open: PropTypes.bool,
  };

  const UsersBankAccounts = () => {
    if (!Array.isArray(UserAccountDetails)) {
      console.error('UserAccountDetails is not an array or is undefined:', UserAccountDetails);
      return []; // Return an empty array as a fallback
    }

    return UserAccountDetails.map((account) => ({
      id: account.accountNo || 1,
      name: account.accountNo || 'No Account',
      email: account.account_Type || 'No Email',
      color: '#8B4513', // Default color
      projects: [
        {
          id: account.accountNo || 1,
          title: account.account_Type || 'No Account Type',
        },
      ],
    }));
  };
  const AddNewAccount = () => {
    // Logic to add a new account
    console.log('Add New Account Clicked');
    // You can open a dialog or redirect to a new account creation page
    return <CreateNewAccount />;
    <CreateNewAccount />;

  };
  const handleCurrentAccountDetailsChange = (accountId) => {
    // Logic to handle current account details change
    console.log('Current Account Details Changed');
    if (accountId === undefined || accountId === null) {
      // You can update the current account details or perform any other action
      console.error('Invalid accountId:', accountId);
      return;
    } else {
      console.log('Updating current account with accountId:', accountId);
      const updatedAccount = UserAccountDetails.find(account => account.accountNo === accountId);
      setCurrentAccount(updatedAccount);
      console.log('Updated Current Account:', updatedAccount);
    }
  };

  function SidebarFooterAccountPopover() {
    const accounts = UsersBankAccounts(); // Call the function to get the array

    return (
      <Stack direction="column">
        <Typography variant="body2" mx={2} mt={1}>
          Accounts
        </Typography>
        <MenuList>
          {accounts.map((account) => (
            <MenuItem
              key={account.id}
              component="button"
              onClick={() => handleCurrentAccountDetailsChange(account.id)}
              sx={{
                justifyContent: 'flex-start',
                width: '100%',
                columnGap: 2,
              }}
            >
              <ListItemIcon>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: '0.95rem',
                    bgcolor: account.color,
                  }}
                  src={account.image ?? ''}
                  alt={account.name ?? ''}
                >
                  {account.name[0]}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '100%',
                }}
                primary={account.name}
                secondary={account.email}
                primaryTypographyProps={{ variant: 'body2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </MenuItem>
          ))}
        </MenuList>
        <Divider />
        <AccountPopoverFooter sx={{ justifyContent: 'space-between' }}>
          <AddIcon
            titleAccess='Add Account'
            sx={{ fontSize: 40, color: 'text.secondary', cursor: 'pointer' }}
            onClick={AddNewAccount}
          />
          <SignOutButton />
        </AccountPopoverFooter>
      </Stack>
    );
  }

  const createPreviewComponent = (mini) => {
    function PreviewComponent(props) {
      return <AccountSidebarPreview {...props} mini={mini} />;
    }
    return PreviewComponent;
  };

  function SidebarFooterAccount({ mini }) {
    const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
    return (
      <Account
        slots={{
          preview: PreviewComponent,
          popoverContent: SidebarFooterAccountPopover,
        }}
        slotProps={{
          popover: {
            transformOrigin: { horizontal: 'left', vertical: 'bottom' },
            anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
            disableAutoFocus: true,
            slotProps: {
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: (theme) =>
                    `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                  mt: 1,
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    bottom: 10,
                    left: 0,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            },
          },
        }}
      />
    );
  }

  SidebarFooterAccount.propTypes = {
    mini: PropTypes.bool.isRequired,
  };

  // const CurrentAccountDetail = {
  //   user: {
  //     name: user.firstName,
  //     email: userEmail,
  //     image: '/myphoto.jpg', // Adjust the path to your image
  //   },
  // };

  // function Home(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');
  const [segment, setSegment] = React.useState('ViewBalance');
  // const [UserAaccountDetails, setUserAccountDetails] = React.useState({
  //   panNo: '',
  //   accountNo: '',
  //   account_Type: '',
  //   accountCreatedOn: '',
  // });
  // const [UserCurrentAccountDetails, setUserCurrentAccountDetails] = React.useState()
  // const [mail, setMail] = React.useState('');
  // const {user, userRole, username, password, userEmail, userId,clearUserData,UserAccountDetails,setUserAccountDetails,setCurrentAccount,currentAccount} = useUser();
  // setMail(userEmail);
  
 const CurrentAccountDetail = React.useMemo(() => ({
  user: {
    name: user.firstName,
    email: 'AccNo: ' + currentAccount?.accountNo,
    accountNo: UserAccountDetails?.accountNo || 'No Account',
  }
}), [ currentAccount, UserAccountDetails]);
  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  const [session, setSession] = React.useState(CurrentAccountDetail);


  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(CurrentAccountDetail);
        setPathname('/login');
      },
      signOut: () => {
        clearUserData();
        setPathname('/login');

        setSession(null);
      },

    };
  }, [CurrentAccountDetail]);
  console.log('User Account Details:', UserAccountDetails);
  console.log('Current Account:', currentAccount);

  return (
    // Remove this provider when copying and pasting into your project.
     <div>
    {UserAccountDetails === null || UserAccountDetails === undefined || UserAccountDetails.length === 0 ? (
      <div>
        Loading.....
      </div>
    ) :(


    <DemoProvider window={demoWindow}>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        branding={{
          logo: <img src="./BMBLogo.png" alt="BMB Logo" />,
          title: 'Bhartiya Manoranjan Bank',
          homeUrl: '/ViewBalance',
        }}
        theme={demoTheme}
        window={demoWindow}
        authentication={authentication}
        session={CurrentAccountDetail}
      >
        {/* preview-start */}
        <DashboardLayout
          slots={{
            toolbarActions: CustomToolbarActions,
            sidebarFooter: SidebarFooterAccount,
          }}
        >
          <DemoPageContent pathname={pathname} />
        </DashboardLayout>
        {/* preview-end */}
      </AppProvider>

    </DemoProvider>
    )}
    </div>
  );
}


Home.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.any,
};

export default Home;