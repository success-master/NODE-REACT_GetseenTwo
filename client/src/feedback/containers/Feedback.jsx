import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import FeedbackList from "../components/FeedbackList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import NoticeFeedback from "../components/NoticeFeedback";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Feedback = () => {
  const groupId = useParams().groupId;
  const [loadedFeedback, setLoadedFeedback] = useState();
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/feedback/group/${groupId}`
        );

        setLoadedFeedback(responseData.groupFeedback);

        if (!sendRequest.ok) {
          throw new Error(sendRequest.groupFeedback);
        }
      } catch (err) {}
    };
    fetchFeedback();
  }, [sendRequest, groupId]);

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      <NoticeFeedback />

      {isLoading && <LoadingSpinner dark="dark" />}
      {!isLoading && loadedFeedback && <FeedbackList items={loadedFeedback} />}
    </React.Fragment>
  );
};

export default Feedback;
