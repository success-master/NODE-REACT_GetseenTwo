import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import ModalView from "../../shared/components/Navigation/ModalView";
import Input from "../../shared/components/FormElements/Input";
import FormButtonWrapper from "../../shared/components/FormElements/FormButtonWrapper";
import Button from "../../shared/components/FormElements/Button";
import CancelButton from "../../shared/components/FormElements/CancelButton";
import ModalHeader from "../../shared/components/Navigation/ModalHeader";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import NoticeNewTemplate from "../components/NoticeNewTemplate";

const TemplateCreate = () => {
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const [formState, inputHandler] = useForm({
    templateTitle: {
      value: "",
      isValid: false,
    },
    templateContent: {
      value: "",
      isValid: false,
    },
  });

  const addTemplateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/templates/create`,
        "POST",
        JSON.stringify({
          templateTitle: formState.inputs.templateTitle.value,
          templateContent: formState.inputs.templateContent.value,
          templateCreator: auth.userId,
          templateAccount: auth.accountId,
        }),
        { "Content-Type": "application/json" }
      );
      if (!sendRequest.ok) {
        throw new Error(sendRequest.message);
      }
    } catch (err) {}
    history.push("/" + auth.accountId + "/templates");
  };
  return (
    <ModalView>
      <ErrorModal error={isError} onClear={clearError} />
      <ModalHeader
        pageTitle="Create New Template"
        // pageSubTitle="You're almost there..."
      >
        <Button>View Guide</Button>
      </ModalHeader>
      <NoticeNewTemplate />
      <form onSubmit={addTemplateSubmitHandler}>
        <Input
          id="templateTitle"
          element="input"
          type="text"
          label="Title"
          description="Create a simple template title for you and your team to refer back to:"
          placeholder="e.g. Positive Review Response"
          validators={[VALIDATOR_MINLENGTH(4)]}
          errorText="Must contain at least 4 characters"
          onInput={inputHandler}
        />
        <Input
          id="templateContent"
          element="textarea"
          type="text"
          label="Content"
          description="Now include a message which you and your team can re-use multiple times:"
          placeholder="e.g. Thank you so much --Customer Name-- for your positive review! It helps other customers find us online. We'll see you again soon!"
          validators={[VALIDATOR_MINLENGTH(28)]}
          errorText="Templates must contain at least 28 characters"
          onInput={inputHandler}
        />

        <FormButtonWrapper>
          <CancelButton />
          <Button
            type="submit"
            buttonStyle="btn--default--dark"
            buttonSize="btn--small"
            buttonCustom="btn--wide"
            disabled={!formState.isValid}
          >
            {isLoading ? <LoadingSpinner /> : "Create Template"}
          </Button>
        </FormButtonWrapper>
      </form>
    </ModalView>
  );
};

export default TemplateCreate;
