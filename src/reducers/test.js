import { TEST } from '../actions/test';

const initialState = {
  items: [],
  isFetching: false,
};

export default function test(state = initialState, action) {
  switch (action.type) {
    case TEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    default:
      return state;
  }
}
