import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
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

import { DemoProvider } from '@toolpad/core/internal';
import ViewBalance from './ViewBalance/ViewBalance';
import MakeCreditTransaction from './MakeTransaction/MakeCreditTransaction';
import MakeDebitTransaction from './MakeTransaction/MakeDebitTransaction';
import ViewStatement from './ViewStatement/ViewStatement';
import CustomerServices from './CustomerServices/CustomerServices';
import AboutUs from './AboutUs/AboutUs';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
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

function DemoPageContent({ pathname }) {
  
  if (pathname === '/dashboard' || pathname === '/ViewBalance') {
    return(
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

const accounts = [
  {
    id: 1,
    name: 'Mohan Pandey',
    email: 'mohan.pandey@outlook.com',
    image: '/myphoto.jpg', // Adjust the path to your image
    projects: [
      {
        id: 3,
        title: 'Project X',
      },
    ],
  },
  {
    id: 2,
    name: 'Mohan MUI',
    email: 'mohan@mui.com',
    color: '#8B4513', // Brown color
    projects: [{ id: 4, title: 'Project A' }],
  },
];

function SidebarFooterAccountPopover() {
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
      <AccountPopoverFooter>
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

function Home(props) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');
  const [segment, setSegment] = React.useState('ViewBalance');
  const [UserAaccountDetails, setUserAccountDetails] = React.useState({
    panNo: '',
    accountNo: '',
    account_Type: '',
    accountCreatedOn: '',
  });
  // const [mail, setMail] = React.useState('');
  const {user, userRole, username, password, userEmail, userId,clearUserData} = useUser();
  // setMail(userEmail);
  console.log(user.firstName, userRole, userEmail, userId);
const CurrentAccountDetail = {
  user: {
    name: user.firstName,
    email: user.emailID,
    image: '/myphoto.jpg', // Adjust the path to your image
  },
};
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

  React.useEffect(() => {
    axios.get(`https://localhost:7231/api/UserAccountDetail/GetUserAccountDetailsByUserID/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          setUserAccountDetails(response.data);
          console.log('User Account Details:', response.data);
        } else {
          console.error('Login failed');
        }
      });
  }, [userId]);

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
  }, []);

  return (
    // Remove this provider when copying and pasting into your project.
    <DemoProvider window={demoWindow}>
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
         title: 'My Banking App',
         homeUrl: '/toolpad/core/introduction',
            }}
        theme={demoTheme}
        window={demoWindow}
        authentication={authentication}
        session={session}
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