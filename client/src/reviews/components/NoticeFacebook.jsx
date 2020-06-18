import React from "react";

import Button from "../../shared/components/FormElements/Button";

const NoticeFacebook = props => {
  return (
    <div className="container_state_notice">
      <div className="notification_tile facebook_page">
        <div className="notification_img_cont facebook" />
        <div className="notification_text_wrapper">
          <h3 className="notification_header">
            No recommendations? We can fix that. Connect your Facebook page!
          </h3>
          <div className="notification_sub_text max_width">
            Facebook recommendations (reviews)&nbsp;help customers to find you
            on Facebook. Connecting your recomendations takes minutes and is at
            no extra cost.{" "}
            <a href="/guide-link" className="embedded_text_link white-text">
              <span>Learn How</span>
              {/* TODO Add guide links */}
            </a>
          </div>
        </div>
        <Button to="/connect" buttonCustom="btn--notice">
          Connect
        </Button>
      </div>
    </div>
  );
};

export default NoticeFacebook;
