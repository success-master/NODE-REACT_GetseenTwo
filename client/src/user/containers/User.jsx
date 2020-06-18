import React, { useState, useEffect, useContext } from "react";

import ModalView from "../../shared/components/Navigation/ModalView";
import UsersList from "../components/UsersList";
import ModalHeader from "../../shared/components/Navigation/ModalHeader";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_EMAIL } from "../../shared/util/validators";
import CancelButton from "../../shared/components/FormElements/CancelButton";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import FormButtonWrapper from "../../shared/components/FormElements/FormButtonWrapper";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { GroupContext } from "../../shared/context/group-store-context";

const User = () => {
  const { groups } = useContext(GroupContext);
  const auth = useContext(AuthContext);
  const currentGroup = groups.selectedGroup;
  const [loadedUsers, setLoadedUsers] = useState([]);
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      userEmail: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/group/${currentGroup.id}`
        );

        setLoadedUsers(responseData.groupUsers);

        if (!sendRequest.ok) {
          throw new Error(sendRequest.message);
        }
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, currentGroup.id]);

  const userAddHandler = async (event) => {
    event.preventDefault();
    // try {
    //   await sendRequest(
    //     `${process.env.REACT_APP_BACKEND_URL}/api/groups/create`,
    //     "POST",
    //     JSON.stringify({
    //       groupName: formState.inputs.groupName.value,
    //       groupDescription: formState.inputs.groupDescription.value,
    //       groupCreator: auth.userId,
    //       groupAccount: auth.accountId,
    //     }),
    //     { "Content-Type": "application/json" }
    //   );
    // } catch (err) {
    // } finally {
    //   //TODO Re-render groups component upon 201
    //   //fetchGroups();
    // }
  };
  return (
    <ModalView>
      <ErrorModal show={isError} onClear={clearError} />
      <ModalHeader
        pageTitle="Members"
        pageSubTitle={`of ${currentGroup.groupName}.`}
      >
        {/* TODO implement dropdown location selection for Member page */}
        {auth.userIsAdmin === true && (
          <Button to={"/" + auth.accountId + "/groups"}>Manage Groups</Button>
        )}
      </ModalHeader>
      {/* {loadedUsers.length === 1 ? <NoticeUsersEmpty /> : null} */}
      <form onSubmit={userAddHandler}>
        <Input
          id="userEmail"
          element="input"
          type="email"
          // autoFocus="true"
          label="Invite Team Members"
          description={`We'll send a friendly 📧 to join ${currentGroup.groupName}.`}
          placeholder="name@example.com"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a correct email we can send an invite to."
          onInput={inputHandler}
        />
        <FormButtonWrapper>
          <CancelButton />
          <Button
            type="submit"
            buttonStyle="btn--default--dark"
            buttonSize="btn--small"
            buttonCustom="btn--wide"
            disabled={!formState.isValid}
          >
            Invite Member
          </Button>
        </FormButtonWrapper>
      </form>
      {isLoading && (
        <div className="center">
          {" "}
          <LoadingSpinner dark="dark" />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </ModalView>
  );
};

export default User;
