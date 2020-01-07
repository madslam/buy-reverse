import React, {useState, useEffect} from 'react';
import {useLazyQuery} from 'react-apollo';
import firebase from 'firebase';

import Product from '../ProductList/Product';
import {GET_USER} from '../../apollo/query/user';
const ProductList = () => {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
        getUser();
      }
    });
  }, []);
  const [getUser, {loading: loadUser, data: dataUser}] = useLazyQuery(
    GET_USER,
    {
      variables: {id: userId},
      onCompleted: data => console.log(data),
      onError: error => {
        console.log(`erreur lors de la recup d'un user : ${error}`, {
          variant: 'error',
        });
      },
    }
  );
  const user = dataUser && dataUser.getUser;

  if (loadUser) return <p>ca charge</p>;

  return user ? (
    <React.Fragment>
      <div className="container">
        <div className="shelf-container">
          {user.productsUser ? (
            <div>
              <h3>Mes Annonces</h3>
              {user.productsUser.map(p => {
                return (
                  <Product
                    product={p}
                    addProduct={() => console.log('oklm')}
                    key={p.id}
                  />
                );
              })}
            </div>
          ) : (
            <h2>Pas d'annonces</h2>
          )}
        </div>
      </div>
    </React.Fragment>
  ) : (
    <h2>Vous devez etre connecté pour accéder à vos annonces</h2>
  );
};

export default ProductList;
