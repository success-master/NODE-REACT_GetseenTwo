import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";

import Backdrop from "./Backdrop";

const ModalContent = props => {
  const content = (
    <div className="notice_container">
      <button
        className="close_icon absolute_notice w-inline-block"
        onClick={props.onCancel}
      />
      <header className={`notice_heading ${props.headerClass}`}>
        <h3>
          <strong>{props.header}</strong>
        </h3>
      </header>
      <p
        className={`default_description_text align-left _30px_padding_bottom ${props.descriptionClass}`}
      >
        {props.description}
      </p>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
      >
        <div className="modal_content">{props.children}</div>

        <footer
          className={`action_buttons_container align_right ${props.footerClass}`}
        >
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
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={0}
        classNames="modal"
      >
        <ModalContent {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
