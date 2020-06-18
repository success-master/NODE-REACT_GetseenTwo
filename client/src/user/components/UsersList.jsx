import React from "react";

import UserItem from "./UserItem";
import NoticeUserEmpty from "./NoticeUsersEmpty";

const UsersList = (props) => {
  return (
    <React.Fragment>
      {props.items.length === 1 ? <NoticeUserEmpty /> : null}
      {/* <div className="utility_container">
        <h3 className="container_title title">Existing Members</h3>
      </div> */}
      <div>
        {props.items.map((user) => {
          return (
            <UserItem
              key={user.id}
              id={user.id}
              userFirstName={user.userFirstName}
              userLastName={user.userLastName}
              userEmail={user.userEmail}
              userGroups={user.userGroups}
              userPreferences={user.userPreferences}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default UsersList;
