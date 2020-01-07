import React from 'react';
import {Route} from 'react-router-dom';

import ProductDetail from '../component/ProductDetail';
import ProductList from '../component/ProductList';
import ProductAdd from '../component/Product/Add';
import ProductModify from '../component/Product/Modify';
import ProductFav from '../component/ProductFav';
import ProductUser from '../component/ProductUser';
import Login from '../component/Authentification';

const routing = () => (
  <div>
    <Route path="/login" component={Login} />
    <Route path="/productList" component={ProductList} />
    <Route path="/productDetail/:id" component={ProductDetail} />
    <Route path="/productModify/:id" component={ProductModify} />

    <Route path="/productAdd" component={ProductAdd} />
    <Route path="/productFav" component={ProductFav} />
    <Route path="/productUser" component={ProductUser} />
  </div>
);

export default routing;
