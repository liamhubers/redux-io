import { connect } from 'redux-io';

export const TEST = 'test';
export const ASD = 'asd';

export function test() {
  return dispatch => {
    dispatch({
      type: TEST,
    });
  };
}

export function asd(a, b, c) {
  console.log(a, b, c);
  return dispatch => {
    dispatch({
      type: ASD,
      a,
      b,
      c,
    });
  };
}

export default connect('test')(test);
export default connect('test')(asd);