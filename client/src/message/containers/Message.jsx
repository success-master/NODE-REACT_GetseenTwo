import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import ModalView from "../../shared/components/Navigation/ModalView";
import Button from "../../shared/components/FormElements/Button";
import FormButtonWrapper from "../../shared/components/FormElements/FormButtonWrapper";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import ModalHeader from "../../shared/components/Navigation/ModalHeader";
import Modal from "../../shared/components/UIElements/Modal";

const Message = (props) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [showReturnWarning, setShowReturnWarning] = useState(false);

  const showConfirmReturnWarning = () => {
    setShowReturnWarning(true);
  };

  const hideReturnWarning = () => {
    setShowReturnWarning(false);
  };

  const confirmReturnWarning = () => {
    setShowReturnWarning(false);
    console.log("EXITING....");
    props.history.goBack();
  };

  const [formState, inputHandler] = useForm(
    {
      customers: {
        value: "",
        isValid: false,
      },
      message: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const messageSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    console.log("Sending Message....");
    props.history.goBack();
  };

  return (
    <ModalView>
      <ModalHeader
        pageTitle="Create New Message"
        // pageSubTitle={`as ${identifiedGroup.name}`}
      >
        <Button>View Guide</Button>
      </ModalHeader>
      <Modal
        show={showReturnWarning}
        onCancel={hideReturnWarning}
        header="Are you sure you want to cancel without sending?"
        description={`You're about to go back in the middle of sending a message. Your message will not be saved. Are you sure you want to continue?`}
        footer={
          <React.Fragment>
            <Button onClick={hideReturnWarning} buttonMargin="btn--14px--right">
              Cancel
            </Button>
            <Button
              onClick={confirmReturnWarning}
              buttonStyle="btn--default--dark"
              buttonCustom="btn--wide"
            >
              Confirm
            </Button>
          </React.Fragment>
        }
      ></Modal>
      <form onSubmit={messageSubmitHandler}>
        <Input
          id="customers"
          element="textarea"
          type="text"
          // autofocus="true"
          label="Add Customers"
          description="Paste one or more customers below (one per line, customer first name is required, last name is optional)"
          placeholder="Joe Bloggs, +447888077505"
          validators={[VALIDATOR_MINLENGTH(12)]}
          errorText="We need a valid customer name and number or email to send a message"
          onInput={inputHandler}
        />
        {/* Template buttons below:  */}
        <div className="field_container">
          <Button buttonMargin="btn--14px--right">Review Invite</Button>
          <Button buttonMargin="btn--14px--right">Feedback Message</Button>
          <Button buttonMargin="btn--14px--right">Custom Message</Button>
        </div>
        <Input
          id="message"
          element="textarea"
          type="text"
          label="Message"
          description="You can customise the message your customer receives below"
          placeholder="Type a message or select a template above..."
          validators={[VALIDATOR_MINLENGTH(28)]}
          errorText="Please enter a message containing at least 28 characters."
          onInput={inputHandler}
        />

        <FormButtonWrapper>
          <Button
            buttonMargin="btn--14px--right"
            onClick={showConfirmReturnWarning}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            buttonStyle="btn--default--dark"
            buttonSize="btn--small"
            buttonCustom="btn--wide"
            disabled={!formState.isValid}
          >
            Send Message
          </Button>
        </FormButtonWrapper>
      </form>
    </ModalView>
  );
};

export default withRouter(Message);
