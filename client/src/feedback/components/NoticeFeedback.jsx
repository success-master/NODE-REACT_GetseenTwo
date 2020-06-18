import React from "react";
import { FaHeart } from "react-icons/fa";

import Button from "../../shared/components/FormElements/Button";

const NoticeFeedback = () => {
  return (
    <div className="container_state_notice">
      <div className="notification_tile feedback">
        <div className={`notification_img_cont`}>
          <FaHeart />
        </div>
        <div className="notification_text_wrapper">
          <h3 className="notification_header_black">
            With Feedback, get a second chance to sell...
          </h3>
          <div className="notification_sub_text max_width">
            Fix what holds you back. Learn exactly what customers love—or why
            they're leaving—and get the answers you need to drive repeat
            business.
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

export default NoticeFeedback;
