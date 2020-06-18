import React from "react";
import { useParams } from "react-router-dom";

import ConnectItem from "../components/ConnectItem";
import NoticeConnect from "../components/NoticeConnect";

const Connect = (props) => {
  const groupId = useParams().groupId;

  return (
    <>
      <NoticeConnect />
      <ConnectItem
        id="gmb"
        toPath={`/connect/${groupId}/google-my-business`}
        name="Google my Business"
        iconClass="gmb"
        available={true}
        connected={true}
      />
      {/* TODO Build Facebook Manage / Setup connection container */}
      <ConnectItem
        id="facebook"
        toPath={`/connect/${groupId}/facebook-recommendations`}
        name="Facebook"
        iconClass="facebook"
        available={true}
        connected={false}
      />
      <ConnectItem
        id="typeform"
        toPath={`/connect/${groupId}/typeform-responses`}
        name="Typeform"
        iconClass="typeform"
        available={false}
        connected={false}
      />
      <ConnectItem
        id="zapier"
        toPath={`/connect/${groupId}/zapier`}
        name="Zapier"
        iconClass="zapier"
        available={false}
        connected={false}
      />
      <ConnectItem
        id="sms-feedback"
        toPath={`/connect/${groupId}/feedback`}
        name="SMS Feedback"
        iconClass="nps"
        available={false}
        connected={false}
      />
      <ConnectItem
        id="sms"
        toPath={`/connect/${groupId}/sms`}
        name="SMS"
        iconClass="sms"
        available={false}
        connected={false}
      />
    </>
  );
};

export default Connect;
