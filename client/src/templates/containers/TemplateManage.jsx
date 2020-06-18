import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import ModalView from "../../shared/components/Navigation/ModalView";
import CancelButton from "../../shared/components/FormElements/CancelButton";
import Button from "../../shared/components/FormElements/Button";
import FormButtonWrapper from "../../shared/components/FormElements/FormButtonWrapper";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ModalHeader from "../../shared/components/Navigation/ModalHeader";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const TemplateManage = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const templateId = useParams().templateId;
  const [loadedTemplate, setLoadedTemplate] = useState();
  const history = useHistory();

  const showDeleteModalHandler = () => {
    setShowConfirmModal(true);
  };

  const hideDeleteModalHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/templates/${templateId}`,
        "DELETE"
      );
      console.log("DELETING TEMPLATE...");

      if (!sendRequest.ok) {
        throw new Error(sendRequest.message);
      }
    } catch (err) {}
    history.push("/" + auth.accountId + "/templates");
  };

  const [formState, inputHandler, setFormData] = useForm({
    templateTitle: {
      value: "",
      isValid: false,
    },
    templateContent: {
      value: "",
      isValid: false,
    },
  });

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/templates/${templateId}`
        );

        setLoadedTemplate(responseData.template);
        setFormData(
          {
            templateTitle: {
              value: responseData.template.templateTitle,
              isValid: true,
            },
            templateContent: {
              value: responseData.template.templateContent,
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
    fetchTemplate();
  }, [sendRequest, templateId, setFormData]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner dark="dark" />
      </div>
    );
  }

  const templateEditHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/templates/${templateId}`,
        "PATCH",
        JSON.stringify({
          templateTitle: formState.inputs.templateTitle.value,
          templateContent: formState.inputs.templateContent.value,
          templateLastEditedBy: auth.userId,
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
        pageTitle="Manage Template"
        // pageSubTitle="You're almost there..."
      >
        <Button onClick={showDeleteModalHandler}>Delete</Button>
      </ModalHeader>
      {!isLoading && loadedTemplate && (
        <Modal
          show={showConfirmModal}
          onCancel={hideDeleteModalHandler}
          header="Are you sure you want to continue?"
          description={`You’re about to delete ${loadedTemplate.templateTitle}.‍ You’ll lose all information related to this template and it cannot be recovered. ‍Are you sure you want to proceed?`}
          footer={
            <React.Fragment>
              <Button
                onClick={hideDeleteModalHandler}
                buttonMargin="btn--14px--right"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDeleteHandler}
                buttonStyle="btn--default--danger"
                buttonCustom="btn--wide"
              >
                Delete
              </Button>
            </React.Fragment>
          }
        ></Modal>
      )}{" "}
      {!isLoading && loadedTemplate && (
        <form onSubmit={templateEditHandler}>
          <Input
            id="templateTitle"
            element="input"
            type="text"
            //   autoFocus="true"
            label="Title"
            //   description="Create a simple template title for you and your team to refer back to:"
            placeholder="e.g. Positive Review Response"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Must contain at least 6 characters"
            initialValue={loadedTemplate.templateTitle}
            initialValid={true}
            onInput={inputHandler}
          />
          <Input
            id="templateContent"
            element="textarea"
            type="text"
            label="Message"
            //   description="Now include a message which you and your team can re-use multiple times:"
            placeholder="e.g. Thank you so much --Customer Name-- for your positive review! It helps other customers find us online. We'll see you again soon!"
            validators={[VALIDATOR_MINLENGTH(20)]}
            errorText="Templates must contain at least 28 characters"
            initialValue={loadedTemplate.templateContent}
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

export default TemplateManage;
