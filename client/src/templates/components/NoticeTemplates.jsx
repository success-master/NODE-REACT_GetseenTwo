import React from "react";
import { FaFileAlt } from "react-icons/fa";

import Button from "../../shared/components/FormElements/Button";

const NoticeTemplates = (props) => {
  return (
    <div className="container_state_notice">
      <div className="notification_tile">
        <div className={`notification_img_cont`}>
          <FaFileAlt />
        </div>
        <div className="notification_text_wrapper">
          <h3 className="notification_header_black">
            {/* TODO {props.items.length || "4"} TODO add dynamic responder */}
            Your group has 4 templates, add another?
          </h3>
          <div className="notification_sub_text max_width">
            Keep them coming back. Use templates to make sure no review is a
            missed opportunity to let your customer know how much their review
            makes a difference.
          </div>
        </div>
        {/* TODO Add dynamic link including group context */}
        <Button to="/g1/template/create" buttonCustom="btn--notice">
          Create Template
        </Button>
      </div>
    </div>
  );
};

export default NoticeTemplates;
