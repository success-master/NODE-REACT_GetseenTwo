import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaInbox, FaStarHalfAlt, FaLink, FaCog, FaHeart } from "react-icons/fa";

import { GroupContext } from "../../context/group-store-context";
import { AuthContext } from "../../context/auth-context";

const NavLinksTop = (props) => {
  const auth = useContext(AuthContext);
  const { groups } = useContext(GroupContext);
  const groupId = groups.selectedGroup.id;

  return (
    <div className="nav_links_cont">
      <button to={``} className="navbar-button disabled w-inline-block">
        <div className="navigation-icon">
          <FaInbox />
        </div>
        <div className="header_link">Inbox</div>
      </button>

      <NavLink
        to={`/${auth.accountId}/${groupId}/reviews`}
        className="navbar-button w-inline-block"
        activeClassName="navbar-button--current"
        exact={true}
      >
        <div className="navigation-icon">
          <FaStarHalfAlt />
        </div>
        <div className="header_link">Reviews</div>
      </NavLink>

      <NavLink
        to={`/${auth.accountId}/${groupId}/feedback`}
        className="navbar-button w-inline-block"
        activeClassName="navbar-button--current"
        exact={true}
      >
        <div className="navigation-icon feedback">
          <FaHeart />
        </div>
        <div className="header_link">Feedback</div>
      </NavLink>

      <NavLink
        to={`/${auth.accountId}/${groupId}/connect`}
        className="navbar-button w-inline-block"
        activeClassName="navbar-button--current"
        exact={true}
      >
        <div className="navigation-icon">
          <FaLink />
        </div>
        <div className="header_link">Connect</div>
      </NavLink>

      <NavLink
        to={`/${auth.accountId}/${groupId}/settings`}
        className="navbar-button w-inline-block"
        activeClassName="navbar-button--current"
        exact={true}
      >
        <div className="navigation-icon">
          <FaCog />
        </div>
        <div className="header_link">Settings</div>
      </NavLink>
    </div>
  );
};

export default NavLinksTop;
