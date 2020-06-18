import React from "react";
import { FaSitemap } from "react-icons/fa";

import Button from "../../shared/components/FormElements/Button";

const NoticeGroupsEmpty = (props) => {
  return (
    <div className="container_state_notice">
      <div className="notification_tile">
        <div className={`notification_img_cont`}>
          <FaSitemap />
        </div>
        <div className="notification_text_wrapper">
          <h3 className="notification_header_black">
            You have 1 group, add another?
          </h3>
          <div className="notification_sub_text max_width">
            Groups help you to split performance so you can keep on top of
            collecting as many reviews as possible. Assign members to each group
            so no bad review gets missed!
          </div>
        </div>
        <Button buttonCustom="btn--notice">Create Group</Button>
      </div>
    </div>
  );
};

export default NoticeGroupsEmpty;
