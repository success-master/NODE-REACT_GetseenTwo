import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="modal_notice_wrapper" onClick={props.onClick}>
      {props.children}
    </div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
