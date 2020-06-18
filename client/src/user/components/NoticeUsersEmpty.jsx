import React from "react";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";

import Button from "../../shared/components/FormElements/Button";

const NoticeUsersEmpty = (props) => {
  return (
    <div className="container_state_notice">
      <div className="notification_tile">
        <div className={`notification_img_cont`}>
          <FaUsers />
        </div>
        <div className="notification_text_wrapper">
          <h3 className="notification_header_black">
            Streamline communication, get more reviews together.
          </h3>
          <div className="notification_sub_text max_width">
            getseen is even more powerful when you involve your team members to
            collaborate on customer reviews.
          </div>
        </div>

        <Button component={Link} to="/users/add" buttonCustom="btn--notice">
          View Guide
        </Button>
      </div>
    </div>
  );
};

export default NoticeUsersEmpty;
