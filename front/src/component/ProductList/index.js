import React from 'react';
import {useQuery} from 'react-apollo';

import Product from './Product';
import Filter from './Filter';
import Header from './Header';
import {GET_PRODUCTS} from '../../apollo/query/product';

import './style.scss';

const ProductList = () => {
  const {data, loading} = useQuery(GET_PRODUCTS, {
    onCompleted: data => console.log('cest good ', data),
    onError: error => alert(`erreur lors du chargement: ${error}`),
  });
  const products = data && data.getProducts;
  if (loading) return <p>ca charge</p>;

  const p =
    products &&
    products.map(p => {
      return (
        <Product
          product={p}
          addProduct={() => console.log('oklm')}
          key={p.id}
        />
      );
    });

  return (
    <React.Fragment>
      <div className="container">
        <Filter />

        <div className="shelf-container">
          {products ? (
            <div>
              <Header productsLength={products.length} />
              {p}
            </div>
          ) : (
            <p>pas de produit</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductList;
