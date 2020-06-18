import React from "react";

//TODO Make header fully dynamic based on the children components / routes being rendered in the DOM. E.g. pageTitle will render the correct Page Title for each route.

const ModalHeader = props => {
  return (
    <div className="top_actions_container modal">
      <div className="dynamic_name_context">
        <h3 className="container_title">{props.pageTitle}</h3>
        <div className="channel_text">{props.pageSubTitle}</div>
      </div>
      <div className="action_buttons_container">{props.children}</div>
    </div>
  );
};

export default ModalHeader;
