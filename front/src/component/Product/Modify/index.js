import {useMutation} from 'react-apollo';
import {useSnackbar} from 'notistack';
import firebase from 'firebase';
import React, {useState, useEffect} from 'react';
import {useLazyQuery} from 'react-apollo';

import ProductForm from '../Form';
import {GET_PRODUCT, MODIFY_PRODUCT} from '../../../apollo/query/product';
import {getImage} from '../../../firebase';

export default ({match}) => {
  const {enqueueSnackbar} = useSnackbar();

  const [product, setProduct] = useState();
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState([]);
  const [oldImg, setOldImg] = useState([]);

  const [getProduct, {loading: loadProduct}] = useLazyQuery(GET_PRODUCT, {
    variables: {id: match.params.id},
    onCompleted: async data => {
      console.log('coucou !', data);
      setProduct(data.getProduct);
      setOldImg(data.getProduct.images);
      await getImages(data.getProduct.images);
    },
    onError: error => console.log(`erreur lors du chargement: ${error}`),
  });
  const getImages = async images => {
    const imgsUrl = [];

    for (const imgName of images) {
      const imgUrl = await firebase
        .storage()
        .ref(`${imgName}`)
        .getDownloadURL();
      imgsUrl.push({preview: imgUrl, filename: imgName});
    }
    setFiles(imgsUrl);
  };
  const uploadImages = () => {
    files.forEach(element => {
      if (!oldImg.includes(element.filename)) {
        const storageRef = firebase.storage().ref(`${element.filename}`);
        storageRef.put(element.file);
      }
    });
  };

  const [modifyProduct, {loading}] = useMutation(MODIFY_PRODUCT, {
    variables: {product, userId: user.uid},
    onCompleted: data => {
      enqueueSnackbar('Produit modifié avec succés !', {
        variant: 'success',
      });
      uploadImages();
    },
    onError: error => {
      enqueueSnackbar(
        `erreur lors de la modification d'un produit : ${error}`,
        {
          variant: 'error',
        }
      );
      console.log(error);
    },
  });
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('lol', user);
      getProduct();
      setUser(user);
    });
  }, []);

  if (loadProduct) return <p>ca charge</p>;

  return product ? (
    <React.Fragment>
      <h3>Modifier un Produit</h3>
      <ProductForm
        user={user}
        mutation={modifyProduct}
        product={product}
        setProduct={setProduct}
        files={files}
        setFiles={setFiles}
      />
    </React.Fragment>
  ) : (
    <h3>Pas de produit</h3>
  );
};
