import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaFileAlt, FaUserPlus, FaChartBar } from "react-icons/fa";
import { GroupContext } from "../../context/group-store-context";
import { AuthContext } from "../../context/auth-context";

const NavLinksBottom = (props) => {
  const auth = useContext(AuthContext);
  const { groups } = useContext(GroupContext);
  const groupId = groups.selectedGroup.id;

  return (
    <div className="nav_links_cont">
      <NavLink
        to={`/${auth.accountId}/templates`}
        className="navbar-button w-inline-block"
        activeClassName="navbar-button--current"
        exact={true}
      >
        <div className="navigation-icon">
          <FaFileAlt />
        </div>
        <div className="header_link">Templates</div>
      </NavLink>
      <NavLink
        to={`/${auth.accountId}/${groupId}/users`}
        className="navbar-button w-inline-block"
        activeClassName="navbar-button--current"
        exact={true}
      >
        <div className="navigation-icon">
          <FaUserPlus />
        </div>
        <div className="header_link">Members</div>
      </NavLink>

      <button className="navbar-button disabled w-inline-block">
        <div className="navigation-icon">
          <FaChartBar />
        </div>
        <div className="header_link">Reports</div>
      </button>
    </div>
  );
};

export default NavLinksBottom;
