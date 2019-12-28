import {useSelector} from 'react-redux';

export default (entity, initData) => {
  const {isOpen, options} = useSelector (state => {
    if (
      state &&
      state.entities &&
      state.entities.modals &&
      state.entities.modals.isOpen
    ) {
      return {
        isOpen: state.entities.modals.isOpen[entity],
        options: state.entities.modals.options[entity] || initData,
      };
    }
    return {
      options: initData,
      isOpen: false,
    };
  });

  return {isOpen, options};
};
