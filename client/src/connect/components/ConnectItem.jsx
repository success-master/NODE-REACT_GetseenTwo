import React from "react";
// import { useParams } from "react-router-dom";

// import { groups } from "../../shared/util/DUMMY_DATA";

import Card from "../../shared/components/UIElements/Card";

const ConnectItem = (props) => {
  if (props.available === true) {
    return (
      <Card to={props.toPath}>
        <div className="profile_image_container">
          <div className={"connect_logo_container " + props.iconClass} />
        </div>
        <div className="icon_card_content utility">
          <h4 className="card_title_default">
            <strong>{props.name}</strong>
          </h4>
          <div className="sub_text_light">
            {props.connected === true ? "Connected" : "Disconnected"}
          </div>
        </div>
        <div className="utility_text">
          {props.connected === true ? "Manage" : "Setup"}
        </div>
      </Card>
    );
  }
  return (
    <Card to="" cardCustom="card--disabled">
      <div className="profile_image_container">
        <div className={"connect_logo_container " + props.iconClass} />
      </div>
      <div className="icon_card_content utility">
        <h4 className="card_title_default">
          <strong>{props.name}</strong>
        </h4>
        <div className="sub_text_light hide">We're working on it...</div>
      </div>
    </Card>
  );
};

export default ConnectItem;
