import React from 'react';
import PropTypes from 'prop-types';

import Sort from './Sort';

const ProductListHeader = ({productsLength}) => {
  return (
    <div className="shelf-container-header">
      <small className="products-found">
        <span>{productsLength} Product(s) found.</span>
      </small>
      <Sort />
    </div>
  );
};

ProductListHeader.propTypes = {
  productsLength: PropTypes.number.isRequired,
};

export default ProductListHeader;
