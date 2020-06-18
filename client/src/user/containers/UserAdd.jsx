import React from "react";

import ModalView from "../../shared/components/Navigation/ModalView";
import Input from "../../shared/components/FormElements/Input";
import FormButtonWrapper from "../../shared/components/FormElements/FormButtonWrapper";
import Button from "../../shared/components/FormElements/Button";
import CancelButton from "../../shared/components/FormElements/CancelButton";
//TODO implement react-select multiple group select field
// import AsyncMulti from "../../shared/components/FormElements/AsyncMulti";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const UserAdd = () => {
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false
      },
      email: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const userAddHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // send this New User to the backend!
  };

  return (
    <ModalView
      pageTitle="Invite a Member"
      pageSubTitle="We'll send a friendly welcome to their email..."
    >
      <form onSubmit={userAddHandler}>
        <Input
          id="name"
          element="input"
          type="text"
          // autofocus="true"
          placeholder="John Doe"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name"
          onInput={inputHandler}
        />
        <Input
          id="email"
          element="input"
          type="email"
          placeholder="name@example.com"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email"
          onInput={inputHandler}
        />

        {/* <button type="submit">Submit</button> */}
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
    </ModalView>
  );
};

export default UserAdd;
