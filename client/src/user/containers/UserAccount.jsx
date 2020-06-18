import React, { useEffect, useState } from "react";
import { useParams, withRouter, useHistory } from "react-router-dom";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ModalView from "../../shared/components/Navigation/ModalView";
import ModalHeader from "../../shared/components/Navigation/ModalHeader";
import Button from "../../shared/components/FormElements/Button";
import FormButtonWrapper from "../../shared/components/FormElements/FormButtonWrapper";
import CancelButton from "../../shared/components/FormElements/CancelButton";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";

const UserAccount = () => {
  const userId = useParams().userId;
  const [loadedUser, setLoadedUser] = useState();
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

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
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/user/${userId}`
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

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner dark="dark" />
      </div>
    );
  }

  if (!loadedUser && !isError) {
    return (
      <div className="center">
        <h2>Could not find your account!</h2>
      </div>
    );
  }

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
      history.goBack();
    } catch (err) {}
  };

  return (
    <ModalView>
      <ErrorModal error={isError} onClear={clearError} />
      <ModalHeader
        pageTitle="My Account"
        pageSubTitle="Is there anything we can help with?"
      >
        <Button buttonMargin="btn--14px--right">Help Me</Button>
        <Button>Reset my Password</Button>
      </ModalHeader>
      {!isLoading && loadedUser && (
        <form onSubmit={userEditHandler}>
          <Input
            id="userFirstName"
            element="input"
            type="text"
            label="Your First Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Your first name is required for your profile"
            initialValue={loadedUser.userFirstName}
            initialValid={true}
            onInput={inputHandler}
          />
          <Input
            id="userLastName"
            element="input"
            type="text"
            label="Your Last Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Your last name is required for your profile"
            initialValue={loadedUser.userLastName}
            initialValid={true}
            onInput={inputHandler}
          />

          <Input
            id="userEmail"
            element="input"
            type="email"
            label="Your Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="We need an email for your Member profile"
            initialValue={loadedUser.userEmail}
            initialValid={true}
            onInput={inputHandler}
          />

          {/* TODO Add FB graph api for adding profile image
          <Input 
            id="connectedAccounts"
            element="switch"
            errorText="This is coming soon"
            onColor="#4EB0AE"
            label="Connected Accounts"
            validators={[VALIDATOR_SWITCH()]}
            //switchChangeHandler={() => {console.log('switchChangeHandler'); return setCheckboxValue(!checkboxValue)}}
            description="Connect your account with Facebook to add your profile image. 🎨"
            initialValue={loadedUser.userName}
            initialValid={formState.inputs.connectedAccounts.isValid}
            onInput={inputHandler}
          /> */}

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

export default withRouter(UserAccount);
