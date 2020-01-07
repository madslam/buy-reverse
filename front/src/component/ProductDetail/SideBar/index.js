import {makeStyles} from '@material-ui/core/styles';
import {useMutation, useLazyQuery} from 'react-apollo';
import AddShoppingIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import firebase from 'firebase';
import Grid from '@material-ui/core/Grid';
import LikeIcon from '@material-ui/icons/FavoriteBorder';
import ChangeIcon from '@material-ui/icons/Build';
import LikeIconFilled from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined';
import {useHistory} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import {GET_USER, ADD_FAV, REMOVE_FAV} from '../../../apollo/query/user';
import {REMOVE_PRODUCT} from '../../../apollo/query/product';

const useStyles = makeStyles(theme => ({
  sideBar: {
    float: 'right !important',
    boxSizing: 'border-box',
    marginTop: 16,
    padding: 15,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      position: 'absolute !important',
      marginTop: 0,
      right: '0',
      width: '33%',
    },
  },
  productTitle: {
    marginTop: 10,
  },
  button: {
    width: '100%',
  },
  description: {
    color: 'grey',
    textAlign: 'left',
  },
}));

export default ({product}) => {
  const classes = useStyles();
  const history = useHistory();

  const [userId, setUserId] = useState('');

  const [getUser, {loading: loadUser, data: dataUser}] = useLazyQuery(
    GET_USER,
    {
      variables: {id: userId},
      onCompleted: data => {},
      onError: error => {
        console.log(`erreur lors de la recup d'un user : ${error}`, {
          variant: 'error',
        });
      },
    }
  );
  const user = dataUser && dataUser.getUser;
  const [addFav, {loading}] = useMutation(ADD_FAV, {
    variables: {product, user},
    refetchQueries: [
      {
        query: GET_USER,
        variables: {id: userId},
      },
    ],
  });
  const [removeFav, {loading: loadFav}] = useMutation(REMOVE_FAV, {
    variables: {product, user},
    refetchQueries: [
      {
        query: GET_USER,
        variables: {id: userId},
      },
    ],
  });
  const [removeProduct, {loading: loadRemove}] = useMutation(REMOVE_PRODUCT, {
    variables: {product, userId: userId},
    onCompleted: () => {
      console.log('Produit supprimé avec succés !', {
        variant: 'success',
      });
    },
    onError: error => {
      console.log(`erreur lors de la supression d'un produit : ${error}`, {
        variant: 'error',
      });
      console.log(error);
    },
  });
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('aya', user.uid);
      if (user) {
        setUserId(user.uid);
        getUser();
      }
    });
  }, []);

  if (loadUser) return <p>ca charge</p>;

  const handleFav = () => {
    if (!user) {
      alert('connecte toi pour ajouter des favs bro');
      return false;
    }
    if (user.favProductsId.includes(product.id)) {
      alert('déjà dans les fav');
    }
    addFav();
  };

  const BuyButton = () => (
    <Grid item className={classes.button}>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        startIcon={<AddShoppingIcon />}
      >
        Acheter
      </Button>
    </Grid>
  );
  const isFav = () => {
    return (
      <React.Fragment>
        <BuyButton />
        <Button
          className={classes.button}
          color="secondary"
          startIcon={<LikeIconFilled />}
          onClick={removeFav}
        >
          Favoris
        </Button>{' '}
      </React.Fragment>
    );
  };

  const isUser = () => {
    return (
      <React.Fragment>
        <Grid item className={classes.button}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<ChangeIcon />}
            onClick={() => {
              history.push(`/productModify/${product.id}`);
            }}
          >
            Modifier
          </Button>
        </Grid>
        <Grid item className={classes.button}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={removeProduct}
            startIcon={<DeleteIcon />}
          >
            Supprimer
          </Button>
        </Grid>
      </React.Fragment>
    );
  };

  const buttonAction = () => {
    if (user) {
      if (user.userProductsId.includes(product.id)) return isUser();
      if (user.favProductsId.includes(product.id)) return isFav();
    }
    return (
      <React.Fragment>
        <BuyButton />
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          startIcon={<LikeIcon />}
          onClick={handleFav}
        >
          Favoris
        </Button>
      </React.Fragment>
    );
  };
  return (
    <div className={classes.container}>
      <Paper className={classes.sideBar}>
        <Grid
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          container
        >
          <Grid item className={classes.price}>
            <Typography variant="h2" component="h2">
              {product.priceCurrent} €
            </Typography>
          </Grid>
          <Grid item>
            <Divider />

            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Etat
                  </TableCell>
                  <TableCell align="left">neuf</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Emplacement
                  </TableCell>
                  <TableCell align="left">France</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Nombre de vue
                  </TableCell>
                  <TableCell align="left">{product.view}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Intéréssé
                  </TableCell>
                  <TableCell align="left">{product.fav}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Catégorie
                  </TableCell>
                  <TableCell align="left">homme</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid item>
            <Typography className={classes.productTitle}>
              <b>{product.title}</b>
            </Typography>
          </Grid>
          <Grid item>
            <p className={classes.description}>{product.description}</p>
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            {buttonAction()}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
