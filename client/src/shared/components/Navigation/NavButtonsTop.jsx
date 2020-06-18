import React, { useContext } from "react";
import { FaGift, FaPen } from "react-icons/fa";

import SquareButton from "../FormElements/SquareButton";
import ProfileButton from "../FormElements/ProfileButton";
import { GroupContext } from "../../context/group-store-context";

const NavButtonsTop = (props) => {
  const { groups } = useContext(GroupContext);
  //console.log(props);
  const groupId = groups.selectedGroup.id;
  return (
    <>
      <div className="profile_container">
        <ProfileButton {...props}></ProfileButton>
        <SquareButton>
          <FaGift />
        </SquareButton>
        <SquareButton
          to={`/message/${groupId}/new`}
          customButton="inverted"
          customText="compose"
        >
          <FaPen />
        </SquareButton>
      </div>
    </>
  );
};

export default NavButtonsTop;
