import React, { useContext } from "react";
import {
  FaUser,
  FaFingerprint,
  FaUsers,
  FaSitemap,
  FaFileAlt,
} from "react-icons/fa";

import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

const SettingItem = (props) => {
  const auth = useContext(AuthContext);

  if (props.available === true && props.id.includes("my")) {
    return (
      <Card to={`/${auth.accountId}/${auth.userId}/${props.id}`}>
        <div className="profile_image_container">
          <div className={`connect_logo_container`}>
            {props.id === "my-account" ? <FaUser /> : <FaFingerprint />}
          </div>
        </div>
        <div className="icon_card_content utility">
          <h4 className="card_title_default">
            <strong>{props.title}</strong>
          </h4>
        </div>
        <div className="utility_text">Select</div>
      </Card>
    );
  } else if (props.available === true && props.id.includes("groups")) {
    return (
      <Card
        to={
          auth.isAdmin === true
            ? `/${auth.accountId}/groups`
            : `/${auth.userId}/groups`
        }
      >
        <div className="profile_image_container">
          <div className={`connect_logo_container`}>
            <FaSitemap />
          </div>
        </div>
        <div className="icon_card_content utility">
          <h4 className="card_title_default">
            <strong>{props.title}</strong>
          </h4>
        </div>
        <div className="utility_text">Select</div>
      </Card>
    );
  } else if (props.available === true && props.id.includes("users")) {
    return (
      // TODO Replace hard-coded groupId with Group context
      <Card to={`/${auth.accountId}/5e9f1af8a0c7590e8eaa37d7/users`}>
        <div className="profile_image_container">
          <div className={`connect_logo_container`}>
            <FaUsers />
          </div>
        </div>
        <div className="icon_card_content utility">
          <h4 className="card_title_default">
            <strong>{props.title}</strong>
          </h4>
        </div>
        <div className="utility_text">Select</div>
      </Card>
    );
  } else if (props.available === true && props.id.includes("templates")) {
    return (
      // TODO Replace hard-coded groupId with Group context
      <Card to={`/${auth.accountId}/templates`}>
        <div className="profile_image_container">
          <div className={`connect_logo_container`}>
            <FaFileAlt />
          </div>
        </div>
        <div className="icon_card_content utility">
          <h4 className="card_title_default">
            <strong>{props.title}</strong>
          </h4>
        </div>
        <div className="utility_text">Select</div>
      </Card>
    );
  } else {
    return (
      <Card cardCustom="card--disabled" to="">
        <div className="profile_image_container">
          <div className={`connect_logo_container ` + props.iconClass} />
        </div>
        <div className="icon_card_content utility">
          <h4 className="card_title_default">
            <strong>{props.title}</strong>
          </h4>
        </div>
        <div className="utility_text member">Coming soon</div>
      </Card>
    );
  }
};

export default SettingItem;
