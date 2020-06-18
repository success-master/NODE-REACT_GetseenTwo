import React from "react";
import { FaFileAlt } from "react-icons/fa";

import Card from "../../shared/components/UIElements/Card";

const TemplateItem = (props) => {
  const templateContent = props.content;

  return (
    <Card to={`/template/${props.id}/manage`}>
      <div className="icon_image_container">
        <FaFileAlt />
      </div>
      <div className="icon_card_content utility">
        <h4 className="card_title_default">
          <strong>{props.title}</strong>
        </h4>
        <div className="sub_text_light">Created by {props.creator}</div>
        <div className="sub_text_member">
          {templateContent.substring(0, 70)}...
        </div>
      </div>
      <div className="utility_text">Manage</div>
    </Card>
  );
};

export default TemplateItem;
