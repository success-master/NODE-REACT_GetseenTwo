import React from "react";
import { withRouter } from "react-router-dom";

import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_EMAIL } from "../../shared/util/validators";
import logo from "../../assets/images/getseen_logo.svg";
import MainFooter from "../../shared/components/Navigation/MainFooter";

const ResetPassword = (props) => {
  const [formState, inputHandler] = useForm(
    {
      authEmail: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const userResetPasswordHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    props.history.goBack();
    // send this to auth a user!
  };

  return (
    //TODO complete dynamic auth.js container
    <div className="auth_wrapper">
      <div>
        <div className="nav_container" />
        <Button
          //TODO complete button Login link
          to="/members"
          buttonStyle="btn--default--dark"
          buttonCustom="btn--auth--float"
        >
          Log In
        </Button>
        <div className="auth_element_container">
          <img src={logo} alt="getseen logo" className="brisk_auth_logo" />
          <h4 className="no_bold">Forgot your password?</h4>
          <h4 className="_20px_margin_bottom">
            <strong>Please enter your email…</strong>
          </h4>
          <div className="w-form">
            <form
              id="resetPassword"
              onSubmit={userResetPasswordHandler}
              className="w-clearfix"
            >
              <Input
                element="input"
                type="email"
                id="authEmail"
                placeholder="Your email"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address"
                onInput={inputHandler}
              />

              <Button
                type="submit"
                data-wait="Sipping tea..."
                buttonStyle="btn--default--dark"
                buttonCustom="btn--auth"
                disabled={!formState.isValid}
              >
                Reset Password
              </Button>
            </form>
          </div>
        </div>
        <MainFooter />
      </div>
    </div>
  );
};

export default withRouter(ResetPassword);
