import React from "react";
import { Link } from "react-router-dom";

const SquareButton = props => {
  return (
    <Link
      to={`${props.to}`}
      className={`round_button_nav ${props.customButton}`}
    >
      <div className={`present_text ${props.customText}`}>{props.children}</div>
    </Link>
  );
};

export default SquareButton;
