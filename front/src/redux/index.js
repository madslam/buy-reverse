import {combineReducers} from 'redux-starter-kit';

import productReducer from './product';
import userReducer from './user';

const reducers = combineReducers ({
  config: () => {
    try {
      const config = window.CONFIG || {};

      return config;
    } catch (err) {
      return {};
    }
  },
  entities: combineReducers ({
    user: userReducer,
    product: productReducer,
  }),
});

export default reducers;
