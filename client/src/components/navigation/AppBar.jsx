import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { ListItemIcon } from '@material-ui/core';
import { signout } from "../auth/RouteAccess";
import AuthApi from "../auth/AuthApi";
import HamburgerMenu from './HamburgerMenu';
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    height: '10vh'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  }
}));

function HideOnScroll(props) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

export default function HideAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const authApi = React.useContext(AuthApi);
  const user = authApi.auth;
  const logout = async () => {
    await signout();
    authApi.setAuth({ auth: false });
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => window.open('/profile', '_self')}>
        <ListItemIcon>
          <Avatar
            alt={user.name}
            src={user.url}
            style={{ width: '1.6rem', height: '1.6rem' }}
          >
            {user.name[0]}
          </Avatar>
        </ListItemIcon> {user.name}
      </MenuItem>
      <MenuItem onClick={logout}> <ListItemIcon> <ExitToAppOutlinedIcon /> </ListItemIcon> Logout</MenuItem>
    </Menu >
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar style={{ zIndex: '1000' }} elevation={3}>
          <Toolbar>
            <HamburgerMenu selected={props.title || 'Collegemate'} />
            <Typography component='h1' variant="h6" noWrap>
              {props.title || 'Collegemate'}
            </Typography>
            <div className={classes.grow} />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar style={{ backgroundColor: 'inherit', color: 'inherit' }}
                alt={user.name}
                src={user.url}
              >
                <AccountCircleOutlinedIcon />
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      {renderMenu}
    </React.Fragment >
  );
}
