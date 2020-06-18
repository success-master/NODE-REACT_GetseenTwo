import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import ModalView from "../../shared/components/Navigation/ModalView";
import Input from "../../shared/components/FormElements/Input";
import FormButtonWrapper from "../../shared/components/FormElements/FormButtonWrapper";
import Button from "../../shared/components/FormElements/Button";
import CancelButton from "../../shared/components/FormElements/CancelButton";
import ModalHeader from "../../shared/components/Navigation/ModalHeader";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";

function GroupCreate() {
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  //init form state inputs to empty
  const [formState, inputHandler] = useForm({
    groupName: {
      value: "",
      isValid: false,
    },
    groupDescription: {
      value: "",
      isValid: false,
    },
  });

  // POST group to db onSubmit
  const addGroupSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/groups/create`,
        "POST",
        JSON.stringify({
          groupName: formState.inputs.groupName.value,
          groupDescription: formState.inputs.groupDescription.value,
          groupCreator: auth.userId,
          groupAccount: auth.accountId,
        }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );

      if (!sendRequest.ok) {
        throw new Error(sendRequest.message);
      }
    } catch (err) {}
    history.push("/" + auth.accountId + "/groups");
  };
  return (
    <ModalView>
      <ErrorModal show={isError} onClear={clearError} />
      <ModalHeader
        pageTitle="Create New Group"
        pageSubTitle="Get everyone on the same 👀 page."
      ></ModalHeader>
      <form onSubmit={addGroupSubmitHandler}>
        <Input
          id="groupName"
          element="input"
          type="text"
          label="Name"
          description="Enter a name for your new group"
          placeholder="e.g. Dominos Victoria Street"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a group name at least 6 characters long."
          onInput={inputHandler}
          initialValue=""
        />
        <Input
          id="groupDescription"
          element="input"
          type="text"
          label="Description"
          description="Now specify a department, team or short description"
          placeholder="e.g. Aftersales Support / Escalations"
          validators={[VALIDATOR_MAXLENGTH(28)]}
          errorText="Group descriptions can't be more than 28 characters long."
          onInput={inputHandler}
          initialValue=""
        />

        <FormButtonWrapper>
          <CancelButton />
          <Button
            type="submit"
            buttonStyle="btn--default--dark"
            buttonSize="btn--small"
            buttonCustom="btn--wide"
          >
            {isLoading ? <LoadingSpinner /> : "Create Group"}
          </Button>
        </FormButtonWrapper>
      </form>
    </ModalView>
  );
}

export default GroupCreate;
