import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { FaSitemap } from "react-icons/fa";

import { GroupContext } from "../../../shared/context/group-store-context";
import { AuthContext } from "../../../shared/context/auth-context";
import GroupIcon from "../../../assets/images/sitemap.svg";
import PlusIcon from "../../../assets/images/plus.svg";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const Dropdown = (props) => {
  const { dispatch } = useContext(GroupContext);
  const auth = useContext(AuthContext);

  const { data, goTo, defaultValue, isLoading } = props; //console.log(defaultValue);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [selected, setSelected] = useState(defaultValue);
  const onSelect = (group) => {
    dispatch({ type: "SELECTED_GROUP", payload: { selectedGroup: group } });
    const { id, groupName } = group; //console.log(id, name);
    setSelected(groupName);
    goTo(id);
  };

  useEffect(() => {
    if (data.length > 0) {
      if (
        data.filter((item) => {
          return item.groupName === selected;
        }).length === 0
      ) {
        onSelect(data[0]);
      }
    }
  }, [data, selected, onSelect]);

  return (
    <div
      data-delay={0}
      className="button_default dropdown w-dropdown"
      onClick={toggle}
    >
      <div className="dropdown-toggle w-dropdown-toggle">
        <div className="icon_header_button">
          <FaSitemap />
        </div>
        <div>{selected}</div>
        <div className="dropdown-toggle_icon w-icon-dropdown-toggle" />
      </div>
      <nav
        className={classnames("dropdown-list", "w-dropdown-list", {
          "w--open": dropdownOpen,
        })}
      >
        {isLoading && <LoadingSpinner dark="dark" />}
        {!isLoading &&
          data.map((group, i) => (
            <button
              key={i}
              className="dropdown-list_toggle w-dropdown-link"
              onClick={(e) => onSelect(group)}
            >
              {group.groupName}
            </button>
          ))}
        <div className="edit_groups">
          <div className="subtle_dividing_line no_margin" />
          {/* TODO remove hard-coded links */}
          <Link
            to={
              auth.isAdmin === true
                ? `/${auth.accountId}/groups`
                : `/${auth.userId}/groups`
            }
            className="dropdown-list_toggle w-inline-block"
          >
            <div className="dropdown-link">New Group</div>
            <img src={PlusIcon} alt="Add Group" className="dropdown_icon" />
          </Link>
          {/* TODO remove hard-coded links */}
          <Link
            to={
              auth.isAdmin === true
                ? `/${auth.accountId}/groups`
                : `/${auth.userId}/groups`
            }
            className="dropdown-list_toggle w-inline-block"
          >
            <div className="dropdown-link">Manage Groups</div>
            <img
              src={GroupIcon}
              alt="Manage Groups"
              className="dropdown_icon"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};
export default Dropdown;
