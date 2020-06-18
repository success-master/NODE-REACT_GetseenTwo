import React, { useState } from "react";
import { useParams, withRouter } from "react-router-dom";

import { groups } from "../../shared/util/DUMMY_DATA";
import ModalView from "../../shared/components/Navigation/ModalView";
import CancelButton from "../../shared/components/FormElements/CancelButton";
import Button from "../../shared/components/FormElements/Button";
import FormButtonWrapper from "../../shared/components/FormElements/FormButtonWrapper";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import ModalHeader from "../../shared/components/Navigation/ModalHeader";
import Modal from "../../shared/components/UIElements/Modal";

const MessageItem = props => {
  // const [isLoading, setIsLoading] = useState(true);
  const [showReturnWarning, setShowReturnWarning] = useState(false);
  const groupId = useParams().groupId;

  const showConfirmReturnWarning = () => {
    setShowReturnWarning(true);
  };

  const hideReturnWarning = () => {
    setShowReturnWarning(false);
  };

  const confirmReturnWarning = () => {
    setShowReturnWarning(false);
    console.log("EXITING....");
  };

  const identifiedGroup = groups.find(group => group.id === groupId);

  const [formState, inputHandler] = useForm(
    {
      customers: {
        value: "",
        isValid: false
      },
      message: {
        value: "",
        isValid: false
      }
    },
    false
  );

  // if (isLoading) {
  //   return (
  //     <div className="center">
  //       <h2>Loading...</h2>
  //     </div>
  //   );
  // }

  const messageSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    console.log("Sending Message....");
    props.history.goBack();
  };

  return (
    <ModalView>
      <ModalHeader
        pageTitle="Compose New Message..."
        pageSubTitle={`as ${identifiedGroup.name}`}
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
              onClick={hideReturnWarning}
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
          type="text"
          autofocus="true"
          placeholder="Joe Bloggs, +447888077505"
          validators={[VALIDATOR_MINLENGTH(12)]}
          errorText="We need a valid customer name and number or email to send a message"
          onInput={inputHandler}
        />
        <Input
          id="message"
          type="text"
          placeholder="Hi —Name— thanks so much for choosing Brisk! Would you be able to leave us an online review?
          Here’s a link that makes it super simple: https://fdbc.co.uk/e12ds1"
          validators={[VALIDATOR_MINLENGTH(28)]}
          errorText="Please enter a message containing at least 28 characters."
          onInput={inputHandler}
        />

        <FormButtonWrapper>
          <Button buttonMargin="btn--14px--right" onClick={showReturnWarning}>
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

export default withRouter(MessageItem);
