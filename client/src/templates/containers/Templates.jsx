import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { templates } from "../../shared/util/DUMMY_DATA";

import TemplatesList from "../components/TemplatesList";
import ModalView from "../../shared/components/Navigation/ModalView";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ModalHeader from "../../shared/components/Navigation/ModalHeader";
import NoticeTemplates from "../components/NoticeTemplates";
import NoticeDummyTemplates from "../components/NoticeDummyTemplates";
import Button from "../../shared/components/FormElements/Button";

import { useHttpClient } from "../../shared/hooks/http-hook";

const Templates = () => {
  const accountId = useParams().accountId;
  const [loadedTemplates, setLoadedTemplates] = useState();
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/templates/account/${accountId}`
        );

        setLoadedTemplates(responseData.accountTemplates);

        if (!sendRequest.ok) {
          throw new Error(sendRequest.message);
        }
      } catch (err) {}
    };
    fetchTemplates();
  }, [sendRequest, accountId]);

  return (
    <ModalView>
      <ErrorModal error={isError} onClear={clearError} />
      <ModalHeader
        pageTitle="Templates"
        pageSubTitle="Respond to customer reviews quickly..."
      >
        <Button to={`/${accountId}/template/create`}>Create Template</Button>
      </ModalHeader>

      {templates.length === 1 ? <NoticeDummyTemplates /> : <NoticeTemplates />}
      {isLoading && (
        <div className="center">
          {" "}
          <LoadingSpinner dark="dark" />
        </div>
      )}

      {!isLoading && loadedTemplates && (
        <TemplatesList items={loadedTemplates} />
      )}
    </ModalView>
  );
};

export default Templates;
