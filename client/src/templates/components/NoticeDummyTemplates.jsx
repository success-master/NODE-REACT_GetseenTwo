import React from "react";
import { FaFileAlt } from "react-icons/fa";

import Button from "../../shared/components/FormElements/Button";

const NoticeDummyTemplates = (props) => {
  return (
    <div className="container_state_notice">
      <div className="notification_tile">
        <div className={`notification_img_cont`}>
          <FaFileAlt />
        </div>
        <div className="notification_text_wrapper">
          <h3 className="notification_header_black">
            Add 5 best practices Templates?
          </h3>
          <div className="notification_sub_text max_width">
            We'll create 5 reusable templates which can help you to start
            responding to reviews faster and using industry best practices.
            Start responding to customer reviews right away!
          </div>
        </div>
        {/* TODO Add dynamic link including group context */}
        <Button to="/g1/template/create" buttonCustom="btn--notice">
          Add 5 Templates
        </Button>
      </div>
    </div>
  );
};

export default NoticeDummyTemplates;
