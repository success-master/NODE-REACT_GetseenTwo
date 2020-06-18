import React, { useState, useEffect } from "react";

import ReviewItem from "./ReviewItem";
import NoticeGoogle from "./NoticeGoogle";
import NoticeFacebook from "./NoticeFacebook";

const ReviewsList = (props) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(10);

  if (props.items.length === 0) {
    return (
      <>
        <NoticeGoogle />
        <NoticeFacebook />
      </>
    );
  }
  return (
    <>
      <div>
        {props.items.map((review) => {
          return (
            <ReviewItem
              key={review.id}
              id={review.id}
              origin={review.reviewOrigin}
              date={review.reviewCreated}
              reviewer={review.reviewerName}
              rating={review.reviewRating}
              body={review.reviewBody}
              group={review.reviewGroup}
              responded={review.reviewResponded}
              response={review.reviewResponse}
            />
          );
        })}
      </div>
    </>
  );
};

export default ReviewsList;
