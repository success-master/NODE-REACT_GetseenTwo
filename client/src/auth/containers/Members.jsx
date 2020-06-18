import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import logo from "../../assets/images/getseen_logo.svg";
import MainFooter from "../../shared/components/Navigation/MainFooter";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { isLoading, isError, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      userEmail: {
        value: "",
        isValid: false,
      },
      userPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          accountName: undefined,
          userFirstName: undefined,
          userLastName: undefined,
        },
        formState.inputs.userEmail.isValid &&
          formState.inputs.userPassword.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          accountName: {
            value: "",
            isValid: false,
          },
          userFirstName: {
            value: "",
            isValid: false,
          },
          userLastName: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const userLogInHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            userEmail: formState.inputs.userEmail.value,
            userPassword: formState.inputs.userPassword.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(
          responseData.token,
          responseData.userId,
          responseData.accountId,
          responseData.isAdmin,
          responseData.userGroups
        );
      } catch (err) {
        console.log("error:", err);
      }
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/accounts/register`,
          "POST",
          JSON.stringify({
            accountName: formState.inputs.accountName.value,
            userFirstName: formState.inputs.userFirstName.value,
            userLastName: formState.inputs.userLastName.value,
            userEmail: formState.inputs.userEmail.value,
            userPassword: formState.inputs.userPassword.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(
          responseData.token,
          responseData.userId,
          responseData.accountId,
          responseData.isAdmin,
          responseData.userGroups
        );
      } catch (err) {
        console.log("error:", err);
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      <div className="auth_wrapper">
        <div>
          <div className="nav_container" />
          <Button
            onClick={switchModeHandler}
            buttonStyle="btn--default--dark"
            buttonCustom="btn--auth--float"
          >
            {isLoginMode ? "Sign Up" : "Log In"}
          </Button>
          <div className="auth_element_container">
            <img src={logo} alt="getseen logo" className="brisk_auth_logo" />
            <h4 className="no_bold">
              {isLoginMode ? "Welcome back!" : "Lets get cracking."}
            </h4>
            <h4 className="_20px_margin_bottom">
              <strong>
                {isLoginMode
                  ? "Please log in..."
                  : "Please sign up to continue"}
              </strong>
            </h4>
            <div className="w-form">
              <form
                id="loginForm"
                onSubmit={userLogInHandler}
                className="w-clearfix"
              >
                {!isLoginMode && (
                  <div>
                    <Input
                      element="input"
                      type="text"
                      id="accountName"
                      placeholder="Your company name"
                      validators={[VALIDATOR_MINLENGTH(3)]}
                      errorText="Please provide a real company name"
                      onInput={inputHandler}
                    />
                    <Input
                      element="input"
                      type="text"
                      id="userFirstName"
                      placeholder="Your first name"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter your first name"
                      onInput={inputHandler}
                    />
                    <Input
                      element="input"
                      type="text"
                      id="userLastName"
                      placeholder="Your last name"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter your last name"
                      onInput={inputHandler}
                    />
                  </div>
                )}
                <Input
                  element="input"
                  type="email"
                  id="userEmail"
                  placeholder="Your email"
                  validators={[VALIDATOR_EMAIL()]}
                  errorText="Please enter a valid email address"
                  onInput={inputHandler}
                  initialValue=""
                />
                <Input
                  element="input"
                  type="password"
                  id="userPassword"
                  placeholder="Your password"
                  validators={[VALIDATOR_MINLENGTH(6)]}
                  errorText="Please enter a password with atleast 6 characters"
                  onInput={inputHandler}
                  initialValue=""
                />

                {isLoginMode && (
                  <Link
                    to="/accounts/reset-password"
                    className="default_description_text link _20px_margin_bottom"
                  >
                    I forgot my password
                  </Link>
                )}
                <Button
                  type="submit"
                  data-wait="Sipping tea..."
                  buttonStyle="btn--default--dark"
                  buttonCustom="btn--auth"
                  disabled={!formState.isValid}
                >
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : isLoginMode ? (
                    "Log In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </div>
          </div>
          <MainFooter />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
