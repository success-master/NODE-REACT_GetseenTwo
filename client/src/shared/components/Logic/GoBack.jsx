import React from "react";
import { withRouter } from "react-dom";

const goBackHandler = props => {
  props.history.goBack();
};

return;

export default withRouter(goBackHandler);
