import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import Dropdown from "../../shared/components/FormElements/Dropdown";

const GroupListButton = () => {
  const auth = useContext(AuthContext);

  //map : data // goto // defaultvalue
  return <Dropdown />;
};

export default GroupListButton;
