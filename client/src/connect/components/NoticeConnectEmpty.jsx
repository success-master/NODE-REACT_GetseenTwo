import React from "react";
import { FaLink } from "react-icons/fa";

import Button from "../../shared/components/FormElements/Button";

const NoticeConnectEmpty = (props) => {
  return (
    <div className="container_state_notice">
      <div className="notification_tile feedback">
        <div className={`notification_img_cont`}>
          <FaLink />
        </div>
        <div className="notification_text_wrapper">
          <h3 className="notification_header_black">
            Oh no... No connections found!
          </h3>
          <div className="notification_sub_text max_width">
            Connecting takes just 30 seconds and no extra cost. You'll be able
            to receive and respond to important Google messages, pull in reviews
            even respond to reviews in getseen.
          </div>
        </div>
        <Button buttonCustom="btn--notice">Connect</Button>
      </div>
    </div>
  );
};

export default NoticeConnectEmpty;
