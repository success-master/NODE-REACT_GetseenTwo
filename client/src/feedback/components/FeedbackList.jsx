import React from "react";

import FeedbackItem from "./FeedbackItem";
import NoticeNoFeedback from "./NoticeNoFeedback";

const FeedbackList = (props) => {
  if (props.items.length === 0) {
    return <NoticeNoFeedback />;
  }
  return (
    <>
      <div>
        {props.items.map((feedback) => {
          return (
            <FeedbackItem
              key={feedback.id}
              id={feedback.id}
              score={feedback.feedbackScore}
              customer={feedback.feedbackCustomer}
              body={feedback.feedbackBody}
              date={feedback.feedbackCreated}
              group={feedback.feedbackGroup}
              from={feedback.feedbackFrom}
              reminded={feedback.feedbackReminded}
            />
          );
        })}
      </div>
    </>
  );
};

export default FeedbackList;
