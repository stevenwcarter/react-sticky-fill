import React from "react";
import PropTypes from "prop-types";
import Stickyfill from "stickyfill";
import supports from "css-supports";
import styled from "styled-components";

supports.shim();

const stickyfill = Stickyfill();

const StyledWrapper = styled.div`
  top: 0;
  z-index: 1;
`;

class ReactStickyfill extends React.PureComponent {
  componentDidMount() {
    stickyfill.add(this.stickyElement);
  }
  componentWillUnmount() {
    stickyfill.remove(this.stickyElement);
  }

  _getPositionStyleValue() {
    const isStickySupported = CSS.supports("position", "sticky");

    return isStickySupported ? "sticky" : "-webkit-sticky";
  }

  render() {
    return (
      <StyledWrapper
        {...this.props}
        ref={el => {
          this.stickyElement = el;
        }}
        style={{
          top: 0,
          zIndex: 1,
          position: this._getPositionStyleValue(),
          ...this.props.style
        }}
      />
    );
  }
}

ReactStickyfill.displayName = "ReactStickyfill";

ReactStickyfill.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string
};

export default ReactStickyfill;
