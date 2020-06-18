import React, { useState, useEffect } from "react";
import { useParams, withRouter } from "react-router-dom";

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

const ConnectFacebook = (props) => {
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
    console.log("DISCONNECTING FACEBOOK...");
  };

  const [formState, setFormData] = useForm(
    {
      connectFacebookPage: {
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
          coonectFacebookPage: {
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
  //       <h2>Could not find facebook connection data for this group ID!</h2>
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

  return (
    <ModalView>
      <Modal
        show={showConfirmModal}
        onCancel={hideDeleteModalHandler}
        header="Are you sure you want to cancel connecting Facebook?"
        description={`Please select a Facebook page from the list or click "Continue with Facebook" to make a successful connection.`}
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
        pageSubTitle={`Facebook Recommendations`}
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
            ? "Disconnect Facebook"
            : "Continue with Facebook"}
        </Button>
      </ModalHeader>
      <form onSubmit={connectManageSubmitHandler}>
        <div className="settings_toggles">
          <label className={`settings_label ${props.labelClass}`}>
            Select Facebook Page
          </label>
          <p
            className={`default_description_text align-left _10px_margin_bottom ${props.descriptionClass}`}
          >
            Select the Facebook business page which you would like to access
            Facebook Recommendations:
          </p>
          <AsyncSelect
            id="connectFacebookPage"
            cacheOptions
            defaultOptions
            placeholder="e.g. James Bond Limited"
            loadOptions={promiseOptions}
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

export default withRouter(ConnectFacebook);
