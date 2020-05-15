import React from 'react';

function FlexContainer(props) {
  return (
    <div
      className="outer-flex-container"
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        minHeight: props.height || '100vh',
        maxHeight: '100vh',
        background: props.background || "#fff"
      }}
      {...props.outer}
    >
      <div
        className="inner-flex-container"
        style={{
          display: "block",
          alignItems: "center",
          textAlign: "center"
        }}
        {...props.inner}
      >
        {props.children}
      </div>
    </div >
  );
}

export default FlexContainer;
