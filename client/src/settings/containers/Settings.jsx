import React, { useContext } from "react";

import SettingItem from "../components/SettingItem";
import { AuthContext } from "../../shared/context/auth-context";

const Settings = (props) => {
  const auth = useContext(AuthContext);

  return (
    <>
      <SettingItem
        {...auth}
        id="my-account"
        title="My Account"
        available={true}
      />
      <SettingItem
        {...auth}
        id="my-preferences"
        title="Preferences"
        available={true}
      />
      <SettingItem {...auth} id="users" title="Members" available={true} />
      <SettingItem {...auth} id="groups" title="Groups" available={true} />
      <SettingItem
        {...auth}
        id="templates"
        title="Templates"
        available={true}
      />
    </>
  );
};

export default Settings;
