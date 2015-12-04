import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { test } from '../actions/test';

/**
 * Flex board container.
 * @class FlexBoard
 */
@connect(() => { return {} })
class Index extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(test());
  }

  render() {
    return (
      <div id="outter">
        asdasd test
        {this.props.children}
      </div>
    );
  }
}

// Connect props to component
export default Index;
