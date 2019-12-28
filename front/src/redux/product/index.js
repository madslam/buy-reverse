import {createAction, createReducer} from 'redux-starter-kit';

// ACTIONS
export const ON_CHANGE_ACTION = 'PRODUCT/ON_CHANGE';
export const CLEAR_ACTION = 'MODAL/CLEAR';
export const INIT_MODAL_ACTION = 'MODAL/INIT_MODAL';
export const TOGGLE_MODAL_ACTION = 'MODAL/TOGGLE';

// CREATE ACTIONS
export const ON_CHANGE = createAction (ON_CHANGE_ACTION);
export const CLEAR_MODAL = createAction (CLEAR_ACTION);
export const INIT_MODAL = createAction (INIT_MODAL_ACTION);
export const TOGGLE_MODAL = createAction (TOGGLE_MODAL_ACTION);

// INITIAL STATE
export const initialState = {
  productSelected: {},
};

// REDUCER FUNCTION
const onChange = (state, {payload: {entity, ...props}}) => {
  console.log ('isssu', entity, props);
  return {
    productSelected: props.product,
  };
};

const toggle = (state, {payload: {entity}}) =>
  entity && {
    ...state,
    isOpen: {
      [entity]: !state.isOpen[entity],
    },
  };

const initModal = (state, {payload: {entity, init}}) =>
  init &&
  entity && {
    ...state,
    options: {
      ...state.options,
      [entity]: {
        ...state.options[entity],
        ...init,
      },
    },
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
const reducers = createReducer (initialState, {
  [ON_CHANGE]: onChange,
  [INIT_MODAL]: initModal,
  [CLEAR_MODAL]: clearModal,
  [TOGGLE_MODAL]: toggle,
});

export default reducers;
