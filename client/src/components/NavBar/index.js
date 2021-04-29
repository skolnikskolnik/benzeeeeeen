import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
    fontSize: "20px"
  },
  title: {
    flexGrow: 1,
  },
  navBar: {
    backgroundColor: "#363A59"
  },
  grow: {
    flexGrow: 1,
  }, search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  }
}));

export default function NavBar() {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  const [open, setOpen] = useState(false);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const navHome = () => {
    setAnchorEl(null);
    window.location.href = "/";
  };

  const navAcidDb = () => {
    setAnchorEl(null);
    window.location.href = "/aciddatabase";
  };

  const navBaseDb = () => {
    setAnchorEl(null);
    window.location.href = "/basedatabase";
  }

  const titrationNav = () => {
    setAnchorEl(null);
    window.location.href = "/titrationcurve";
  }

  // const calcNav = () => {
  //   setAnchorEl(null);
  //   window.location.href = "/calculator";
  // }

  const openMenu = () => {
    setOpen(true);
  }



  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.navBar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}>
            <MenuIcon />
            <Button
              className={classes.menuButton}
              onClick={openMenu}
            >
              Benzeeeeeen
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose} >
                Close menu
                </MenuItem>
              <MenuItem onClick={navHome} >
                Home
                </MenuItem>
              <MenuItem onClick={navAcidDb} >

                Acid database
                </MenuItem>
              <MenuItem onClick={navBaseDb} >

                Base database
</MenuItem>
              <MenuItem onClick={titrationNav}>
                Titration Curve
                </MenuItem>
              {/* <MenuItem onClick={calcNav}>
                  Calculators home
                </MenuItem> */}
            </Menu>
          </IconButton>
        </Toolbar>
      </AppBar>


    </div>
  );
}