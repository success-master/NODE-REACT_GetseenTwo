import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    // <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
    <div className={`lds-ellipsis ${props.dark}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    // </div>
  );
};

export default LoadingSpinner;
