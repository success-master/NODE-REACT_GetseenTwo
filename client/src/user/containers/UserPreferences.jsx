import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Input from "../../shared/components/FormElements/Input";

import ModalView from "../../shared/components/Navigation/ModalView";
import ModalHeader from "../../shared/components/Navigation/ModalHeader";
import Button from "../../shared/components/FormElements/Button";
import FormButtonWrapper from "../../shared/components/FormElements/FormButtonWrapper";
import CancelButton from "../../shared/components/FormElements/CancelButton";
import { VALIDATOR_SWITCH } from "../../shared/util/validators";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPreferences = (props) => {
  const userId = useParams().userId;
  const [loadedUserPreferences, setLoadedUserPreferences] = useState();
  const { isLoading, isError, sendRequest } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      notifications: {
        value: true || false,
        isValid: true,
      },
      marketing: {
        value: true || false,
        isValid: true,
      },
      relevance: {
        value: true || false,
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/user/${userId}`
        );

        setLoadedUserPreferences(responseData.user.userPreferences[0]);
        setFormData(
          {
            notifications: {
              value: responseData.user.userPreferences[0].notifications,
              isValid: true,
            },
            marketing: {
              value: responseData.user.userPreferences[0].marketing,
              isValid: true,
            },
            relevance: {
              value: responseData.user.userPreferences[0].relevance,
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
    fetchUserPreferences();
  }, [sendRequest, userId, setFormData]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner dark="dark" />
      </div>
    );
  }

  if (!loadedUserPreferences && !isError) {
    return (
      <div className="center">
        <h2>Could not find your account!</h2>
      </div>
    );
  }

  const preferencesUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/preferences/${userId}`,
        "PATCH",
        JSON.stringify({
          notifications: formState.inputs.notifications.value,
          marketing: formState.inputs.marketing.value,
          relevance: formState.inputs.relevance.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    //TODO Render real user data
    <ModalView>
      <ModalHeader
        pageTitle="My Preferences"
        pageSubTitle="Here are your account preferences 🎨."
      >
        <Button>Request my Data</Button>
      </ModalHeader>
      <form onSubmit={preferencesUpdateHandler}>
        <Input
          id="notifications"
          element="switch"
          onColor="#4EB0AE"
          label="Notifications"
          validators={[VALIDATOR_SWITCH()]}
          description="Receive an e-mail notification on unassigned getseen messages (recommended)"
          initialValue={loadedUserPreferences.notifications}
          initialValid={true}
          onInput={inputHandler}
        />
        <Input
          id="marketing"
          element="switch"
          onColor="#4EB0AE"
          label="Marketing"
          validators={[VALIDATOR_SWITCH()]}
          description="I'd like to occasionally get useful getseen tips, inspiration and coupons via email."
          initialValue={loadedUserPreferences.marketing}
          initialValid={true}
          onInput={inputHandler}
        />
        <Input
          id="relevance"
          element="switch"
          onColor="#4EB0AE"
          label="Relevance"
          validators={[VALIDATOR_SWITCH()]}
          description="Enrich my data with select third parties for more relevant content"
          initialValue={loadedUserPreferences.relevance}
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
          >
            Save
          </Button>
        </FormButtonWrapper>
      </form>
    </ModalView>
  );
};

export default withRouter(UserPreferences);
