import React, { useState, useEffect, useContext } from "react";

import GroupsList from "../components/GroupsList";
import ModalView from "../../shared/components/Navigation/ModalView";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ModalHeader from "../../shared/components/Navigation/ModalHeader";
import NoticeGroupsEmpty from "../components/NoticeGroupsEmpty";
import NoticeGroups from "../components/NoticeGroups";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";

const Groups = () => {
  const auth = useContext(AuthContext);
  const [loadedGroups, setLoadedGroups] = useState();
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchGroups = async () => {
      if (auth.userIsAdmin === true) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/groups/account/${auth.accountId}`
          );

          setLoadedGroups(responseData.accountGroups);
          if (!sendRequest.ok) {
            throw new Error(sendRequest.message);
          }
        } catch (err) {}
      } else {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/groups/user/${auth.userId}`
          );

          setLoadedGroups(responseData.userGroups);

          if (!sendRequest.ok) {
            throw new Error(sendRequest.message);
          }
        } catch (err) {}
      }
    };
    fetchGroups();
  }, [
    sendRequest,
    auth.accountId,
    auth.userId,
    // auth.isAdmin,
    auth.userIsAdmin,
  ]);

  return (
    <ModalView>
      <ErrorModal error={isError} onClear={clearError} />
      <ModalHeader
        pageTitle="Groups"
        pageSubTitle="Your account can have more than one."
      >
        <Button to={`/group/${auth.accountId}/create`}>Create Group</Button>
      </ModalHeader>
      {loadedGroups && loadedGroups.length === 1 ? (
        <NoticeGroupsEmpty />
      ) : (
        <NoticeGroups />
      )}
      {isLoading && (
        <div className="center">
          {" "}
          <LoadingSpinner dark="dark" />
        </div>
      )}
      {!isLoading && loadedGroups && <GroupsList items={loadedGroups} />}
    </ModalView>
  );
};

export default Groups;
