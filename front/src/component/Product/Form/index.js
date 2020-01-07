import {makeStyles} from '@material-ui/core/styles';
import {useSnackbar} from 'notistack';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';

import DropZone from '../DropZone';

const useStyles = makeStyles(theme => ({
  container: {
    paddingRight: 20,
    paddingLeft: 20,

    maxWidth: 'none',
    minWidth: '0',
    margin: '2% 0',
    [theme.breakpoints.up('sm')]: {
      margin: '2% 10%',
    },
    marginTop: 20,
    marginBottom: 20,
    position: 'relative !important',
  },
}));

export default ({user, product, files, mutation, setProduct, setFiles}) => {
  const classes = useStyles();

  const addImagesProduct = acceptedFiles => {
    const timestamp = Math.round(+new Date() / 1000);
    const images = [
      ...product.images,
      ...acceptedFiles.map(file => `thumbs/${timestamp}_${file.name}`),
    ];
    setProduct({...product, images});
    setFiles([
      ...files,
      ...acceptedFiles.map(file => {
        console.log(URL.createObjectURL(file));
        return {
          file,
          preview: URL.createObjectURL(file),
          filename: `thumbs/${timestamp}_${file.name}`,
        };
      }),
    ]);
  };
  const deleteImageProduct = file => {
    const newFiles = files.filter(f => f.filename !== file.filename);
    const images = product.images.filter(f => f !== file.filename);
    setProduct({...product, images});

    setFiles(newFiles);
  };
  const handleChange = prop => event => {
    setProduct({...product, [prop]: event.target.value});
  };
  const handleChangePriceMax = event => {
    const price = event.target.value;
    if (price <= 0) {
      alert('réfléchis tu peux pas vendre un produit à 0 euro imbécile');
      setProduct({
        ...product,
        priceMax: '',
      });
      return;
    }
    if (price > 999999999) {
      alert('le prix ne peut pas dépasser 1 millard frérot');
      return;
    }
    const priceMax = Math.round(event.target.value * 100) / 100;
    setProduct({
      ...product,
      priceMax,
      priceMin: priceMax - Math.round(((priceMax * 15) / 100) * 100) / 100,
    });
  };
  const handleChangePriceMin = event => {
    const price = event.target.value;
    if (price <= 0) {
      alert('réfléchis tu peux pas vendre un produit à 0 euro imbécile');
      setProduct({
        ...product,
        priceMin: '',
      });
      return;
    }
    const min =
      product.priceMax -
      Math.round(((product.priceMax * 15) / 100) * 100) / 100;

    if (price > min) {
      alert('le prix doit être au minimmum inférieur de 15%, logique');
      setProduct({
        ...product,
        priceMin: min,
      });
      return;
    }
    setProduct({
      ...product,
      priceMin: Math.round(event.target.value * 100) / 100,
    });
  };

  const handleChangeSellingTime = event => {
    const price = event.target.value;
    if (price < 6) {
      alert('c"est mini 6h frerot');
      setProduct({
        ...product,
        sellingTime: 6,
      });
      return;
    }
    if (price > 48) {
      alert('c"est max 48h frerot');
      setProduct({
        ...product,
        sellingTime: 48,
      });
      return;
    }
    setProduct({
      ...product,
      sellingTime: Math.round(event.target.value),
    });
  };
  return user ? (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <DropZone
          files={files}
          addImagesProduct={addImagesProduct}
          deleteImageProduct={deleteImageProduct}
        />
        <TextField
          margin="dense"
          value={product.title}
          label="titre"
          onChange={handleChange('title')}
          error={product.name === ''}
          helperText={product.name === '' ? 'champ obligatoire!' : ' '}
          variant="outlined"
          fullWidth
        />
        <TextField
          margin="dense"
          multiline
          rows="5"
          value={product.description}
          label="description de l'article"
          onChange={handleChange('description')}
          error={product.name === ''}
          helperText={product.name === '' ? 'champ obligatoire!' : ' '}
          variant="outlined"
          fullWidth
        />

        <Grid container spacing={2}>
          <Grid item>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
              margin="dense"
              variant="outlined"
              type="number"
              value={product.priceMax}
              label="prix Max"
              placeholder="0,00€"
              onChange={handleChangePriceMax}
              error={product.name === ''}
              helperText={product.name === '' ? 'champ obligatoire!' : ' '}
            />
          </Grid>
          <Grid item>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
              margin="dense"
              variant="outlined"
              type="number"
              value={product.priceMin}
              label="prix Min"
              placeholder="0,00€"
              onChange={handleChangePriceMin}
              error={product.name === ''}
              helperText={product.name === '' ? 'champ obligatoire!' : ' '}
            />
          </Grid>{' '}
          <Grid item>
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="end">h</InputAdornment>,
              }}
              margin="dense"
              variant="outlined"
              value={product.sellingTime}
              label="temps de vente ( heure )"
              type="number"
              onChange={handleChangeSellingTime}
              error={product.sellingTime === ''}
              helperText={
                product.sellingTime === '' ? 'champ obligatoire!' : ' '
              }
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={() => mutation()}>
          Ajouter
        </Button>
      </FormControl>
    </div>
  ) : (
    <h3>Vous devez etre connecté pour ajouter un produit</h3>
  );
};
