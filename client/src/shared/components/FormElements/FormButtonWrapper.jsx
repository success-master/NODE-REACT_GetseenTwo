import React from "react";

const FormButtonWrapper = props => {
  return (
    <div className={`action_button_container align-right`}>
      {props.children}
    </div>
  );
};

export default FormButtonWrapper;
