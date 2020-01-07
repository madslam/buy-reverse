import {createAction, createReducer} from 'redux-starter-kit';

// ACTIONS
export const LOGIN_SUCCESS_ACTION = 'USER/LOGIN_SUCCESS';
export const CLEAR_ACTION = 'MODAL/CLEAR';

// CREATE ACTIONS
export const LOGIN_SUCCESS = createAction(LOGIN_SUCCESS_ACTION);
export const CLEAR_MODAL = createAction(CLEAR_ACTION);

// INITIAL STATE
export const initialState = {
  isConnected: false,
};

// REDUCER FUNCTION
const loginSuccess = (state, {payload: {entity, ...props}}) => {
  return {
    isConnected: true,
  };
};

const clearModal = (state, {payload: {entity}}) =>
  entity && {
    ...state,
    isOpen: {
      ...state.isOpen,
      [entity]: null,
    },
    options: {
      ...state.options,
      [entity]: null,
    },
  };

// REDUCER
const reducers = createReducer(initialState, {
  [LOGIN_SUCCESS]: loginSuccess,
  [CLEAR_MODAL]: clearModal,
});

export default reducers;
