import React from "react";

import Box from "@material-ui/core/Box";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined';

import SignUpForm from './SignUpForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      {...other}
    >
      {value === index && (
        <Box p={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

function SignUpView() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static" elevation={0} color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Student" icon={<LocalLibraryOutlinedIcon />} />
          <Tab label="Staff" icon={<HowToRegOutlinedIcon />} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SignUpForm user='Student' />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignUpForm user='Staff' />
      </TabPanel>
    </div>
  );
}

export default SignUpView;
