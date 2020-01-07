import {useMutation} from 'react-apollo';
import {useSnackbar} from 'notistack';
import firebase from 'firebase';
import React, {useState, useEffect} from 'react';

import ProductForm from '../Form';
import {CREATE_PRODUCT} from '../../../apollo/query/product';

export default () => {
  const {enqueueSnackbar} = useSnackbar();

  const [product, setProduct] = useState({
    title: '',
    description: '',
    priceMax: '',
    priceMin: '',
    sellingTime: 6,
    images: [],
  });
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('lol', user);
      setUser(user);
    });
  }, []);
  const uploadImages = () => {
    files.forEach(element => {
      console.log(element);
      const storageRef = firebase.storage().ref(`${element.filename}`);
      storageRef.put(element.file);
    });
  };

  const [createProduct, {loading}] = useMutation(CREATE_PRODUCT, {
    variables: {product, userId: user.uid, file: files[0]},
    onCompleted: data => {
      enqueueSnackbar('Produit ajouté avec succés !', {
        variant: 'success',
      });
      uploadImages();
    },
    onError: error => {
      enqueueSnackbar(`erreur lors de l'ajout d'un produit : ${error}`, {
        variant: 'error',
      });
      console.log(error);
    },
  });

  return (
    <React.Fragment>
      <h3>Ajouter un Produit</h3>
      <ProductForm
        user={user}
        mutation={createProduct}
        product={product}
        setProduct={setProduct}
        files={files}
        setFiles={setFiles}
      />
    </React.Fragment>
  );
};
