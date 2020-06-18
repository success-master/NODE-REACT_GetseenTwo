import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import AsyncSelect from "react-select/async";

import ModalView from "../../shared/components/Navigation/ModalView";
import CancelButton from "../../shared/components/FormElements/CancelButton";
import Button from "../../shared/components/FormElements/Button";
import FormButtonWrapper from "../../shared/components/FormElements/FormButtonWrapper";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";

import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { GroupContext } from "../../shared/context/group-store-context";
import ModalHeader from "../../shared/components/Navigation/ModalHeader";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserManage = (props) => {
  const auth = useContext(AuthContext);
  const { groups, dispatch } = useContext(GroupContext);
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const userId = useParams().userId;
  const [loadedUser, setLoadedUser] = useState();
  const history = useHistory();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formState, inputHandler, setFormData] = useForm({
    userFirstName: {
      value: "",
      isValid: false,
    },
    userLastName: {
      value: "",
      isValid: false,
    },

    userEmail: {
      value: "",
      isValid: false,
    },
    // TODO implement react-select component to patch a users groups.
    userGroups: {
      value: [],
      isValid: false,
    },
  });
  const groupOptions = groups.adminAvailableGroups.map(function (item) {
    return { value: item.id, label: item.groupName };
  });
  console.log("debug1");
  console.log(groupOptions);
  const filterGroups = (inputValue) => {
    return groupOptions.filter((group) =>
      group.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterGroups(inputValue));
      }, 2000);
    });

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
        `${process.env.REACT_APP_BACKEND_URL}/users/user/${userId}`,
        "DELETE"
      );
      console.log("DELETING USER...");

      if (!sendRequest.ok) {
        throw new Error(sendRequest.message);
      }
    } catch (err) {}
    // history.goBack();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/user/${userId}`,
          "GET"
        );
        setLoadedUser(responseData.user);
        setFormData(
          {
            userFirstName: {
              value: responseData.user.userFirstName,
              isValid: true,
            },
            userLastName: {
              value: responseData.user.userLastName,
              isValid: true,
            },

            userEmail: {
              value: responseData.user.userEmail,
              isValid: true,
            },
            userGroups: {
              value: responseData.user.userGroups,
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
    fetchUser();
  }, [sendRequest, userId, setFormData]);

  useEffect(() => {
    if (loadedUser) {
      setSelectedOptions(
        groupOptions.filter(function (item) {
          return loadedUser.userGroups.includes(item.value);
        })
      );
    }
  }, [loadedUser, groupOptions]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner dark="dark" />
      </div>
    );
  }

  const changeGroup = (e) => {
    setSelectedOptions(e);
    if (e) {
      inputHandler(
        "userGroups",
        e.map(function (item) {
          return item.value;
        }),
        true
      );
    }
  };

  const userEditHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/user/${userId}`,
        "PATCH",
        JSON.stringify({
          userFirstName: formState.inputs.userFirstName.value,
          userLastName: formState.inputs.userLastName.value,
          userEmail: formState.inputs.userEmail.value,
          userGroups: formState.inputs.userGroups.value,
        }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {
      console.log(err);
    }

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/groups/user/${userId}`
      );
      dispatch({
        type: "AVAILABLE_GROUPS",
        payload: { availableGroups: responseData.userGroups },
      });
      if (!sendRequest.ok) {
        throw new Error(sendRequest.message);
      }
    } catch (err) {}

    history.goBack();
  };

  return (
    <ModalView>
      <ErrorModal error={isError} onClear={clearError} />
      {!isLoading && loadedUser && (
        <React.Fragment>
          <ModalHeader
            pageTitle={`Manage ` + loadedUser.userFirstName}
            pageSubTitle={`Member of ` + groups.selectedGroup.groupName}
          >
            {auth.userId === userId && (
              <Button
                to={`/${auth.accountId}/${auth.userId}/my-account`}
                buttonSize="btn--small"
                buttonCustom="btn--wide"
                buttonMargin="btn--14px--right"
              >
                Edit My Profile
              </Button>
            )}
            {auth.userIsAdmin === true && (
              <Button
                onClick={showDeleteModalHandler}
                buttonSize="btn--small"
                buttonCustom="btn--wide"
              >
                Delete
              </Button>
            )}
          </ModalHeader>

          <Modal
            show={showConfirmModal}
            onCancel={hideDeleteModalHandler}
            header={`Are you sure you want to delete ${loadedUser.userFirstName}?`}
            description={`You’re about to delete this member.‍ You’ll lose all information related to ${loadedUser.userFirstName}. ‍Are you sure you want to proceed?`}
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

          <form onSubmit={userEditHandler}>
            <Input
              id="userFirstName"
              element="input"
              type="text"
              label="Member First Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name"
              initialValue={loadedUser.userFirstName}
              initialValid={auth.userIsAdmin}
              onInput={inputHandler}
            />
            {/* TODO Add Hover state to advise the user that this users information can only be edited by a user Admin. 
            <div className={`settings_toggles ${props.togglesClass}`}>
              <label className={`settings_label ${props.labelClass}`}>
                Member First Name
              </label>

              <div className="input_field_default disabled">
                {loadedUser.userFirstName}
              </div>
            </div> */}

            <Input
              id="userLastName"
              element="input"
              type="text"
              label="Member Last Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid name"
              initialValue={loadedUser.userLastName}
              initialValid={auth.userIsAdmin}
              onInput={inputHandler}
            />
            {/* <div className={`settings_toggles ${props.togglesClass}`}>
              <label className={`settings_label ${props.labelClass}`}>
                Member Last Name
              </label>

              <div className="input_field_default disabled">
                {loadedUser.userLastName}
              </div>
            </div> */}
            <Input
              id="userEmail"
              element="input"
              type="email"
              label="Member Email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email"
              initialValue={loadedUser.userEmail}
              initialValid={auth.userIsAdmin}
              onInput={inputHandler}
            />
            {/* <div className={`settings_toggles ${props.togglesClass}`}>
              <label className={`settings_label ${props.labelClass}`}>
                Member Email
              </label>

              <div className="input_field_default disabled">
                {loadedUser.userEmail}
              </div>
            </div> */}

            {/* Group Async-select component from react-select library */}
            <div className="settings_toggles">
              <label className={`settings_label ${props.labelClass}`}>
                Manage Member's Groups
              </label>
              <p
                className={`default_description_text align-left _10px_margin_bottom ${props.descriptionClass}`}
              >
                You can change or amend a group which this member is included in
                below.
              </p>
              <AsyncSelect
                id="userGroupsSelect"
                isMulti
                cacheOptions
                defaultOptions
                value={selectedOptions}
                placeholder="Hmmm, this member has no groups? That's weird."
                loadOptions={promiseOptions}
                onChange={changeGroup}
              />
            </div>

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
        </React.Fragment>
      )}
    </ModalView>
  );
};

export default UserManage;
