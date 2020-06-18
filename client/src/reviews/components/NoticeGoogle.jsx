import React from "react";

import Button from "../../shared/components/FormElements/Button";

const NoticeGoogle = props => {
  return (
    <div className="container_state_notice">
      <div className="notification_tile google_page">
        <div className="notification_img_cont google" />
        <div className="notification_text_wrapper">
          <h3 className="notification_header">
            Don't miss out, connect your Google Business profile!
          </h3>
          <div className="notification_sub_text max_width">
            Connecting takes just a few steps and is no extra cost. You'll be
            able to receive and respond to Google messages, pull in reviews even
            faster and respond to reviews in Seen.
          </div>
        </div>
        <Button to="/connect" buttonCustom="btn--notice">
          Connect
        </Button>
      </div>
    </div>
  );
};

export default NoticeGoogle;
