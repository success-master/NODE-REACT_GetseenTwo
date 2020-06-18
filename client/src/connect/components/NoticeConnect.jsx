import React from "react";
import { FaLink } from "react-icons/fa";

import Button from "../../shared/components/FormElements/Button";

const NoticeConnect = (props) => {
  return (
    <div className="container_state_notice">
      <div className="notification_tile feedback">
        <div className={`notification_img_cont`}>
          <FaLink />
        </div>
        <div className="notification_text_wrapper">
          <h3 className="notification_header_black">
            Tired of all the back-and-forth?
          </h3>
          <div className="notification_sub_text max_width">
            Streamline your online review process by simplifying and automating
            it. Save time and money all while increasing conversions, building
            customer loyalty and strengthening your brand.
          </div>
        </div>
        <Button buttonCustom="btn--notice" to="/request-a-connection">
          Suggest a Connection
        </Button>
      </div>
    </div>
  );
};

export default NoticeConnect;
