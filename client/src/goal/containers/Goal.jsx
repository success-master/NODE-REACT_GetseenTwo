import React from "react";
import { useParams } from "react-router-dom";

import { groups } from "../../shared/util/DUMMY_DATA";

const Goal = props => {
  const groupId = useParams().groupId;

  const identifiedGroup = groups.find(group => group.id === groupId);

  if (!identifiedGroup) {
    return <h2>No Reviews found matching that Group ID.</h2>;
  }
  return (
    <React.Fragment>
      <div className="review_services_container">
        <a
          href="../views/compose-message.html"
          className="service_link w-inline-block"
        >
          <div className="service_image reviews" />
          <div className="review_text">
            Get more <strong>online reviews</strong>
            <strong />
          </div>
        </a>
        <a href="/message/new" className="service_link w-inline-block">
          <div className="service_image custom" />
          <div className="review_text">
            Create a <strong>custom</strong>&nbsp;message
            <strong />
          </div>
        </a>
      </div>
    </React.Fragment>
  );
};

export default Goal;
