import React from "react";
import { FaSitemap } from "react-icons/fa";

import Card from "../../shared/components/UIElements/Card";

const GroupItem = (props) => {
  return (
    <Card to={`/group/${props.id}/manage`}>
      <div className="icon_image_container">
        <FaSitemap />
      </div>
      <div className="icon_card_content utility">
        <h4 className="card_title_default">
          <strong>{props.name}</strong>
        </h4>
        <div className="sub_text_member">{props.description}</div>
      </div>
      <div className="utility_text">Manage</div>
    </Card>
  );
};

export default GroupItem;
