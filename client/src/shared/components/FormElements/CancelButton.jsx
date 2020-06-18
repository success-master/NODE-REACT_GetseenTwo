import React from "react";
import { withRouter } from "react-router";

import Button from "./Button";

const CancelButton = props => {
  const handleClickClose = () => {
    props.history.goBack();
  };

  return (
    <Button
      onClick={handleClickClose}
      type="button"
      buttonSize="btn--small"
      buttonMargin="btn--14px--right"
      className="button_default _14px_margin_right brisk_max_height w-button"
    >
      Cancel
    </Button>
  );
};

export default withRouter(CancelButton);
