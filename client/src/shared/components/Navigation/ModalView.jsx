import React, { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";

import CloseModal from "../FormElements/CloseModal";

const ModalView = (props) => {
  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        // console.log("Closing attempt...");
        props.history.goBack();
      }
    },
    [props.history]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const modalContent = (
    <div className="modal_view_wrapper">
      {/* TODO onCancel to close modal hook and not go back via URL. */}
      <CloseModal />
      <div className="app_modal_content">{props.children}</div>
    </div>
  );
  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-view")
  );
};

export default withRouter(ModalView);
