export const initialState = {
  modal: false,
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setModal':
      return { ...state, modal: action.payload.modal };
      break;
    default:
      return state;
  }
};
