import React from "react";
import GroupItem from "./GroupItem";

const GroupsList = (props) => {
  return (
    <div className="utility_container">
      {/* <div className="utility_container">
        <h3 className="container_title title">
          {props.items === 1
            ? "Only one group. Create another?"
            : "Existing Groups"}
        </h3>
      </div> */}
      {props.items.map((group) => {
        return (
          <GroupItem
            key={group.id}
            id={group.id}
            name={group.groupName}
            description={group.groupDescription}
            creator={group.groupCreator}
            members={group.groupUsers}
            connections={group.groupConnections}
          />
        );
      })}
    </div>
  );
};

export default GroupsList;
