import {fade, makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import InputBase from '@material-ui/core/InputBase';
import React, {useState, useEffect} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LikeIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  link: {
    color: 'black',
    textDecoration: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
  nav: {
    backgroundColor: 'white',
    color: '#989898',
  },
  avatar: {
    margin: 10,
  },
  button: {},
  search: {
    border: '1px solid #5fb1ff',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {right: '10%', color: 'black'},
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export default props => {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged(userConnected => {
      setUser(userConnected);
      console.log(firebase.auth().currentUser.uid);
    });
  }, []);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.nav}>
          <Link
            to="/productList"
            className={classes.title + ' ' + classes.link}
          >
            <Typography variant="h6">Reverse Buy</Typography>
          </Link>
          <Link to="/productAdd" className={classes.link}>
            <Button color="primary" className={classes.button}>
              Vendre un produit
            </Button>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputcdRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'search'}}
            />
          </div>
          <div className={classes.grow}>
            {user ? (
              <Grid container>
                <IconButton color="secondary" aria-label="add to shopping cart">
                  <LikeIcon fontSize="large" />
                </IconButton>

                <Avatar
                  alt="avatar"
                  className={classes.avatar}
                  src={user.photoURL}
                  onClick={handleClick}
                />

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      firebase.auth().signOut();
                    }}
                  >
                    se déconnecter
                  </MenuItem>
                </Menu>
              </Grid>
            ) : (
              <Link to="/login" className={classes.link}>
                <Button onClick={() => console.log(props)} color="inherit">
                  login
                </Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
