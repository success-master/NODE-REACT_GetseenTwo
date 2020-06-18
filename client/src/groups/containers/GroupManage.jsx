import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import ModalView from "../../shared/components/Navigation/ModalView";
import CancelButton from "../../shared/components/FormElements/CancelButton";
import Button from "../../shared/components/FormElements/Button";
import FormButtonWrapper from "../../shared/components/FormElements/FormButtonWrapper";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ModalHeader from "../../shared/components/Navigation/ModalHeader";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const GroupManage = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const groupId = useParams().groupId;
  const [loadedGroup, setLoadedGroup] = useState();
  const history = useHistory();

  const showDeleteModalHandler = () => {
    setShowConfirmModal(true);
  };

  const hideDeleteModalHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/groups/${groupId}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      console.log("DELETING GROUP...");

      if (!sendRequest.ok) {
        throw new Error(sendRequest.message);
      }
    } catch (err) {}
    history.push("/" + auth.accountId + "/groups");
  };

  const [formState, inputHandler, setFormData] = useForm({
    groupName: {
      value: "",
      isValid: false,
    },
    groupDescription: {
      value: "",
      isValid: false,
    },
  });

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/groups/${groupId}`
        );

        setLoadedGroup(responseData.group);
        setFormData(
          {
            groupName: {
              value: responseData.group.groupName,
              isValid: true,
            },
            groupDescription: {
              value: responseData.group.groupDescription,
              isValid: true,
            },
          },
          true
        );

        if (!sendRequest.ok) {
          throw new Error(sendRequest.message);
        }
      } catch (err) {}
    };
    fetchGroup();
  }, [sendRequest, groupId, setFormData]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner dark="dark" />
      </div>
    );
  }

  const groupEditHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/groups/${groupId}`,
        "PATCH",
        JSON.stringify({
          groupName: formState.inputs.groupName.value,
          groupDescription: formState.inputs.groupDescription.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
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
      <ErrorModal error={isError} onClear={clearError} />
      <ModalHeader
        pageTitle="Manage Group"
        pageSubTitle="Update a group name and description."
      >
        <Button
          onClick={showDeleteModalHandler}
          buttonSize="btn--small"
          buttonCustom="btn--wide"
        >
          Delete
        </Button>
      </ModalHeader>
      {!isLoading && loadedGroup && (
        <Modal
          show={showConfirmModal}
          onCancel={hideDeleteModalHandler}
          header="Are you sure you want to continue?"
          description={`You’re about to delete ${loadedGroup.groupName}.‍ You’ll lose all information related to ${loadedGroup.groupName}. ‍Are you sure you want to proceed?`}
          footer={
            <React.Fragment>
              <Button
                onClick={hideDeleteModalHandler}
                buttonMargin="btn--14px--right"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDeleteHandler}
                buttonStyle="btn--default--danger"
                buttonCustom="btn--wide"
              >
                Delete
              </Button>
            </React.Fragment>
          }
        ></Modal>
      )}
      {!isLoading && loadedGroup && (
        <form onSubmit={groupEditHandler}>
          <Input
            id="groupName"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a group name at least 6 characters long."
            initialValue={loadedGroup.groupName}
            initialValid={true}
            onInput={inputHandler}
          />
          <Input
            id="groupDescription"
            element="input"
            type="text"
            label="Description"
            validators={[VALIDATOR_MAXLENGTH(28)]}
            errorText="Group descriptions can't be more than 28 characters long."
            initialValue={loadedGroup.groupDescription}
            initialValid={true}
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
              Save
            </Button>
          </FormButtonWrapper>
        </form>
      )}
    </ModalView>
  );
};

export default GroupManage;
