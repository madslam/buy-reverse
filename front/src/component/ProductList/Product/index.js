import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import firebase from 'firebase';
import {makeStyles} from '@material-ui/core/styles';

import Thumb from '../../Thumb';
import {ON_CHANGE} from '../../../redux/product';

const useStyles = makeStyles(theme => ({
  shelfItem: {
    float: ' left',
    minWidth: ' 140px',
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: ' 18%',
    },
    position: ' relative',
    textAlign: ' center',
    boxSizing: ' border-box',
    marginLeft: ' 5%',
    marginTop: ' 1%',
    marginBottom: ' 1%',
    border: ' 1px solid #b9b9b9',
    cursor: ' pointer',
    '&:hover': {
      border: '1px solid #eee',
    },
  },
}));

const Product = ({product, addProduct}) => {
  const [img, setImg] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  let formattedPrice = product.priceCurrent;

  const history = useHistory();

  const handleChange = useCallback(() => dispatch(ON_CHANGE({product})));
  const getImage = async () => {
    const firstImage = product.images[0];

    const urlImage = await firebase
      .storage()
      .ref(`${firstImage}`)
      .getDownloadURL();
    console.log(urlImage);
    setImg(urlImage);
  };
  useEffect(() => {
    getImage();
  });
  const handleClick = () => {
    handleChange();
    history.push(`/productDetail/${product.id}`);
  };
  return (
    <div
      className={classes.shelfItem}
      onClick={() => addProduct(product)}
      data-sku={product.sku}
    >
      {img != '' ? (
        <Thumb
          classes="shelf-item__thumb"
          src={img}
          alt={product.title}
          onClick={handleClick}
        />
      ) : null}
      <p className="shelf-item__title">{product.title}</p>
      <div className="shelf-item__price">
        <div className="val">
          <b>{formattedPrice}</b> <small>€</small>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
};

export default Product;
