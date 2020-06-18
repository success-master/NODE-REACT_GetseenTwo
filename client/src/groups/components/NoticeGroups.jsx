import React from "react";
import { FaSitemap } from "react-icons/fa";
import Emoji from "../../shared/components/FormElements/Emoji";

import Button from "../../shared/components/FormElements/Button";

const NoticeGroups = () => {
  return (
    <div className="container_state_notice">
      <div className="notification_tile">
        <div className={`notification_img_cont`}>
          <FaSitemap />
        </div>
        <div className="notification_text_wrapper">
          <h3 className="notification_header_black">
            Keep an <Emoji label="briefcase" symbol="👀" /> (or two!) on your
            teams, locations and brands.
          </h3>
          <div className="notification_sub_text max_width">
            Get in-depth reporting for a comprehensive view of each teams
            reputation, so you can focus on what’s working well and fix what’s
            not, per team!
          </div>
        </div>
        <Button buttonCustom="btn--notice">View Guide</Button>
      </div>
    </div>
  );
};

export default NoticeGroups;
