import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";
import { FaLink } from "react-icons/fa";

import { groupOptions, groups } from "../../shared/util/DUMMY_DATA";
import ModalView from "../../shared/components/Navigation/ModalView";
import CancelButton from "../../shared/components/FormElements/CancelButton";
import Button from "../../shared/components/FormElements/Button";
import FormButtonWrapper from "../../shared/components/FormElements/FormButtonWrapper";
import { useForm } from "../../shared/hooks/form-hook";
import ModalHeader from "../../shared/components/Navigation/ModalHeader";
import Modal from "../../shared/components/UIElements/Modal";

import AsyncSelect from "react-select/async";
import ConnectItem from "../components/ConnectItem";

const ConnectSettings = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const groupId = useParams().groupId;

  const showDeleteModalHandler = () => {
    setShowConfirmModal(true);
  };

  const hideDeleteModalHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDisconnectHandler = () => {
    setShowConfirmModal(false);
    console.log("DISCONNECTING...");
  };

  const [formState, setFormData] = useForm(
    {
      connectGoogleAccount: {
        value: "",
        isValid: false,
      },
      connectGoogleLocation: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedGroup = groups.find((group) => group.id === groupId);

  useEffect(() => {
    if (identifiedGroup) {
      setFormData(
        {
          connectGoogleAccount: {
            value: groupOptions.id,
            isValid: true,
          },
          connectGoogleLocation: {
            value: groupOptions.id,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedGroup]);

  // if (!identifiedGroup) {
  //   return (
  //     //TODO implement styling for empty state data
  //     <div className="center">
  //       <h2>Could not find connection data for this group ID!</h2>
  //     </div>
  //   );
  // }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  const connectManageSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    // props.history.goBack();
  };

  // Multi select from react-select

  const filterColors = (inputValue) => {
    return groupOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 4000);
    });

  const changeAccount = (e) => {
    console.log(e);
  };

  return (
    <ModalView>
      <Modal
        show={showConfirmModal}
        onCancel={hideDeleteModalHandler}
        header="Are you sure you want to cancel connecting Google?"
        description={`You're about to go back before connecting your Google Reviews. Your Google reviews will not be saved. Are you sure you want to continue?`}
        footer={
          <React.Fragment>
            <Button
              onClick={hideDeleteModalHandler}
              buttonMargin="btn--14px--right"
            >
              Go Back
            </Button>
            <Button
              onClick={confirmDisconnectHandler}
              buttonStyle="btn--default--dark"
              buttonCustom="btn--wide"
            >
              Continue Connecting
            </Button>
          </React.Fragment>
        }
      ></Modal>
      <ModalHeader
        pageTitle={ConnectItem.connected === true ? "Manage" : "Setup"}
        pageSubTitle={`Google My Business`}
      >
        <Button buttonSize="btn--small" buttonMargin="btn--14px--right">
          View Guide
        </Button>
        <Button
          onClick={showDeleteModalHandler}
          buttonSize="btn--small"
          buttonStyle="btn--default--dark"
          buttonCustom="btn--wide"
        >
          {ConnectItem.connected === true
            ? "Disconnect Google"
            : "Continue with Google"}
        </Button>
      </ModalHeader>
      <form onSubmit={connectManageSubmitHandler}>
        <div className="settings_toggles">
          <label className={`settings_label ${props.labelClass}`}>
            Select Account
          </label>
          <p
            className={`default_description_text align-left _10px_margin_bottom ${props.descriptionClass}`}
          >
            Select the Google account which you would like to access your Google
            My Business locations:
          </p>
          <AsyncSelect
            id="connectGoogleAccount"
            cacheOptions
            defaultOptions
            placeholder="e.g. Martins Group Salisbury"
            loadOptions={promiseOptions}
            onChange={changeAccount}
          />
        </div>
        <div className="settings_toggles">
          <label className={`settings_label ${props.labelClass}`}>
            Connect Location
          </label>
          <p
            className={`default_description_text align-left _10px_margin_bottom ${props.descriptionClass}`}
          >
            Select the Google My Business location which you would like to{" "}
            <FaLink /> to getseen:
          </p>
          <AsyncSelect
            id="connectGoogleLocation"
            cacheOptions
            defaultOptions
            placeholder="e.g. Martins Basingstoke"
            loadOptions={promiseOptions}
            onChange={changeAccount}
          />
        </div>
        <FormButtonWrapper>
          <CancelButton />
          <Button
            type="submit"
            buttonStyle="btn--default--dark"
            buttonSize="btn--small"
            buttonCustom="btn--wide"
            // disabled={!formState.isValid}
          >
            {ConnectItem.connected === true ? "Update" : "Connect"}
          </Button>
        </FormButtonWrapper>
      </form>
    </ModalView>
  );
};

export default withRouter(ConnectSettings);
