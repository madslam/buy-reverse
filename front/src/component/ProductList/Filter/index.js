import React, {useState} from 'react';

import SelectMultipleItem from '../../SelectMultipleItem';
import './style.scss';

const Filter = () => {
  const [filters, setFilters] = useState ([]);

  return (
    <div className="filters">
      <h4 className="title">Filter :</h4>
      <SelectMultipleItem
        daysAvalaible={filters}
        handleChange={() => setFilters}
      />
    </div>
  );
};

export default Filter;
