import React from 'react';
import {Route} from 'react-router-dom';

import ProductDetail from '../component/ProductDetail';
import ProductList from '../component/ProductList';
import ProductAdd from '../component/ProductAdd';
import Login from '../component/Authentification';

const routing = () => (
  <div>
    <Route path="/login" component={Login} />
    <Route path="/productList" component={ProductList} />
    <Route path="/productDetail/:id" component={ProductDetail} />
    <Route path="/productAdd" component={ProductAdd} />
  </div>
);

export default routing;
