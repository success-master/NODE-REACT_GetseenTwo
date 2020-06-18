import React from "react";
import { FaUser } from "react-icons/fa";

import Card from "../../shared/components/UIElements/Card";

const UserItem = (props) => {
  return (
    <Card to={`/user/${props.id}/manage`}>
      <div className="icon_image_container">
        <FaUser />
      </div>
      <div className="icon_card_content utility">
        <h4 className="card_title_default">
          <strong>
            {props.userFirstName} {props.userLastName}
          </strong>
        </h4>
        <div className="sub_text_member">{props.userEmail}</div>
      </div>
      <div className="utility_text">Manage </div>
    </Card>
  );
};

export default UserItem;
