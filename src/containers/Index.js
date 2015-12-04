import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Flex board container.
 * @class FlexBoard
 */
@connect(() => { return {} })
class Index extends Component {
  /**
   * Property types.
   * @property {object} propTypes Property types
   * @static
   */
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  /**
   /**
   * Render method.
   * @method render
   * @return {object} Markup of the component
   */
  render() {
    return (
      <div id="asd">
        test
      </div>
    );
  }
}

// Connect props to component
export default Index;
