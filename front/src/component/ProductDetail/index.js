import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Carousel from 'nuka-carousel';
import {useQuery} from 'react-apollo';
import {GET_PRODUCT} from '../../apollo/query/product';

import SideBar from './SideBar';
import {getImage} from '../../firebase';

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
  containerImage: {
    position: 'relative',
    float: 'left',
    boxSizing: 'border-box',
    minHeight: '1px',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '66%',
    },
    left: 'auto',
    right: 'auto',
  },
  itemsPhotoContainer: {
    width: '100%',
    border: '2px solid white',
  },
  itemsPhoto: {
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
    height: '40vh',
    [theme.breakpoints.up('lg')]: {
      height: '80vh',
    },
    [theme.breakpoints.up('sm')]: {},
    padding: '0',
    margin: '0 auto',
  },
  image: {
    objectFit: 'scale-down',
    height: '40vh',
    [theme.breakpoints.up('lg')]: {
      height: '80vh',
    },
    minWidth: '100px',
    display: 'initial !important',
  },
}));

export default ({match}) => {
  const classes = useStyles();
  const [imgs, setImgs] = useState([]);

  const {data, loading: loadProduct} = useQuery(GET_PRODUCT, {
    variables: {id: match.params.id},
    onCompleted: async data => {
      const imgsUrl = await getImage(data.getProduct.images);
      setImgs(imgsUrl);
    },
    onError: error => console.log(`erreur lors du chargement: ${error}`),
  });
  const product = data && data.getProduct;

  if (loadProduct) return <p>ca charge</p>;

  return product ? (
    <div className={classes.container}>
      <div className={classes.containerImage}>
        <section className={classes.itemsPhotoContainer}>
          <div className={classes.itemsPhoto}>
            <Carousel speed={1000} wrapAround>
              {imgs.map(url => (
                <img width="40%" className={classes.image} src={url} />
              ))}
            </Carousel>
          </div>
        </section>
      </div>
      <SideBar product={product} />
    </div>
  ) : (
    <h3> pas de produit </h3>
  );
};
