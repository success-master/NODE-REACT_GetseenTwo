import React from "react";
import { FaPlus } from "react-icons/fa";

import Button from "../../shared/components/FormElements/Button";

const NoticeNoFeedback = () => {
  return (
    <div className="container_state_notice">
      <div className="notification_tile feedback">
        <div className={`notification_img_cont`}>
          <FaPlus />
        </div>
        <div className="notification_text_wrapper">
          <h3 className="notification_header_black">No feedback just yet...</h3>
          <div className="notification_sub_text max_width">
            Send customers a feedback request to start showing your feedback
            here.
            <a href="/guide-link" className="embedded_text_link">
              <span>Learn More</span>
            </a>
          </div>
        </div>
        <Button to="" buttonCustom="btn--notice">
          View Guide
        </Button>
      </div>
    </div>
  );
};

export default NoticeNoFeedback;
