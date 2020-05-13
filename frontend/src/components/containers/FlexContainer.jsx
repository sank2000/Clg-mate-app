import React from 'react';

function FlexContainer(props) {
  return (
    <div
      className="outer-container"
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        height: "100vh",
        background: "#fff"
      }}
      {...props.outer}
    >
      <div
        className="inner-container"
        style={{
          display: "block",
          alignItems: "center",
          textAlign: "center"
        }}
        {...props.inner}
      >
        {props.children}
      </div>
    </div>
  );
}

export default FlexContainer;
