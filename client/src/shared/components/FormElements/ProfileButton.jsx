import React, { useState } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import Emoji from "./Emoji";

const ProfileButton = (props) => {
  const { accountId, userId, logout } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div
      data-delay={0}
      className="profile_button_nav dropdown w-dropdown"
      onClick={toggle}
    >
      <div className="dropdown-toggle profile w-dropdown-toggle">
        <div className="user_first_name_placeholder">W</div>
      </div>
      <nav
        className={classnames(
          "dropdown-list",
          "profile_button",
          "w-dropdown-list",
          {
            "w--open": dropdownOpen,
          }
        )}
      >
        <Link
          to={`/${accountId}/${userId}/my-account`}
          className="dropdown-list_toggle w-dropdown-link"
        >
          My Account
          <Emoji label="briefcase" symbol="💼" />
        </Link>
        <button
          onClick={logout}
          className="dropdown-list_toggle w-dropdown-link"
        >
          Logout <Emoji label="wave" symbol="👋" />
        </button>
      </nav>
    </div>
  );
};
export default ProfileButton;
