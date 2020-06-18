import React from "react";
import { FaStarHalfAlt } from "react-icons/fa";

import Button from "../../shared/components/FormElements/Button";

const NoticeReviews = (props) => {
  return (
    <div className="container_state_notice">
      <div className="notification_tile feedback">
        <div className={`notification_img_cont`}>
          <FaStarHalfAlt />
        </div>
        <div className="notification_text_wrapper">
          <h3 className="notification_header_black">
            With Reviews, get seen where it matters most!
          </h3>
          <div className="notification_sub_text max_width">
            Be the obvious choice for people who find you online. Stand out on
            the sites that matter by easily collecting hundreds of customer
            reviews by making it super easy and clear for customers.
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

export default NoticeReviews;
