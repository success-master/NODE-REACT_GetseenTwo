import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ReviewsList from "../components/ReviewsList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import NoticeReviews from "../components/NoticeReviews";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Reviews = () => {
  const groupId = useParams().groupId;
  const [loadedReviews, setLoadedReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage, setReviewsPerPage] = useState(5);
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/reviews/group/${groupId}`
        );

        setLoadedReviews(responseData.groupReviews);

        if (!sendRequest.ok) {
          throw new Error(sendRequest.groupReviews);
        }
      } catch (err) {}
    };
    fetchReviews();
  }, [sendRequest, groupId]);

  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = loadedReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      <NoticeReviews />

      {isLoading && <LoadingSpinner dark="dark" />}
      {!isLoading && loadedReviews && (
        <ReviewsList items={currentReviews} isLoading={isLoading} />
      )}
    </React.Fragment>
  );
};

export default Reviews;
