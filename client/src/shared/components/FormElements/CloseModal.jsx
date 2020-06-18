import React from "react";
import { withRouter } from "react-router";

import close from "../../../assets/images/close_modal.svg";

const CloseModal = (props) => {
  const handleClickClose = () => {
    props.history.goBack();
  };

  return (
    <div className="close_modal">
      <button
        className="button_default_small_dark close_modal w-inline-block"
        onClick={handleClickClose}
      >
        <img src={close} width={12} alt="Close Modal Menu" />
      </button>
      <div className="text-block">ESC</div>
    </div>
  );
};

export default withRouter(CloseModal);
