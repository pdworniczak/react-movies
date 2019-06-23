const initialSearchParams = { page: 1 };

const reducerFunc = {
  setSearchParams: (state, searchParams) => {
    return { ...state, searchParams: { ...searchParams } };
  },
  clearSearchParams: state => {
    return { ...state, searchParams: { ...initialSearchParams } };
  }
};

export default (state = { searchParams: initialSearchParams }, action) => {
  const func = reducerFunc[action.type];

  const newState = func && func(state, action.payload);

  return newState || state;
};
