import React from "react";

const NotificationPopup = props => {
  return (
    <div className="notification_component">
      <div className="notification_text">We couldn't find that Email.</div>
      <a href="#" className="close_icon w-inline-block" />
    </div>
  );
};

export default NotificationPopup;
