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
        minHeight: (props.height || props.withAppBar) && ('calc(100vh - 4.2rem - 5px)' || '100vh'),
        maxHeight: props.maxHeight || '100%',
        padding: '10px',
        overflow: 'hidden',
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
