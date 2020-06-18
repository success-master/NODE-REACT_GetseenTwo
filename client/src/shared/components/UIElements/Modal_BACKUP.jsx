import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";
import Goal from "../../../goal/containers/Goal";

const Overlay = props => {
  const content = (
    <div>
      <header className={`notice--heading ${props.headingClass}`}>
        <h3>
          <strong>{props.header}</strong>
        </h3>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
      >
        <div className="notice_container">
          <Goal />
        </div>

        <footer className={`default_description_text ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = props => {
  return (
    <React.Fragment>
      {props.show && (
        <Backdrop onClick={props.onCancel}>
          <Overlay {...props} />
        </Backdrop>
      )}
    </React.Fragment>
  );
};

export default Modal;
