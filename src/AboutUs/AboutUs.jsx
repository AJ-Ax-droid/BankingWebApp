import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../CSS/utility.css';


const AboutUs = () => {

  const [expanded, setExpanded] = React.useState(false);
  const [innerexpanded, setInnerExpanded] = React.useState(false);


  const handleExpandChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
 const handleInnerExpandChange = (panel) => (event, isExpanded) => {
    setInnerExpanded(isExpanded ? panel : false);
  };



  return (
    <div className='centered-container'>
      <Box className="Box-PaperBg" sx={{ maxWidth: '900px' }}>
        <h3> About this App</h3>
        <Accordion expanded={expanded === 'panel1'} onChange={handleExpandChange('panel1')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">ViewBlance Tab</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Easily check your current account balance in real time. This feature allows users to stay updated with their available funds before making any transactions.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleExpandChange('panel2')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">Make Transaction</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Accordion  expanded={innerexpanded === 'panel2-inner1'} onChange={handleInnerExpandChange('panel2-inner1')}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Add/Receive Payments</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Users can conveniently receive payments in two ways:
                </Typography>
                <ul>
                  <li>Add unlimited funds directly to their account.</li>
                  <li>Receive payments from any BMB user by scanning their QR code.
Simply click on the “Receive Payment from QR” button, scan the code, and the money will be transferred instantly to your account.</li>
                </ul>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={innerexpanded === 'panel2-inner2'} onChange={handleInnerExpandChange('panel2-inner2')}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Make Payments</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Users can make payments with multiple options:
                </Typography>
                <ul>
                  <li>Transfer money to an existing BMB user by verifying their account.</li>
                  <li>Scan the QR code of any BMB user to transfer money directly to their account.</li>
                  <li>Scan a real UPI QR code (money will be deducted from the user's account, but since this is a simulated transaction, it will not be transferred as real money).</li>
                </ul>
              </AccordionDetails>
            </Accordion>

          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleExpandChange('panel3')}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">View Statement</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Keep track of your financial activities with a detailed transaction history. The statement feature provides a complete record of all payments sent and received, helping users stay transparent and organized.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>

  );
};

export default AboutUs;
