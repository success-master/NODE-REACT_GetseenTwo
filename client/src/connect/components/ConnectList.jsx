import React from "react";

import NoticeConnect from "./NoticeConnect";
import ConnectItem from "./ConnectItem";
// import NoticeConnectEmpty from "./NoticeConnectEmpty";
// import GroupContext from "../../shared/context/group-store-context";

const ConnectList = (props) => {
  //TODO include group context in this component to sync connections connectConnected
  return (
    <>
      <NoticeConnect />
      {/* {props.items.length === 0 ? <NoticeConnectEmpty /> :} */}
      <div>
        <ConnectItem
          id="google-my-business"
          name="Google my Business"
          iconClass="gmb"
          available={true}
          connected={false}
        />
        <ConnectItem
          id="facebook-recommendations"
          name="Facebook Reviews"
          iconClass="facebook"
          available={true}
          connected={false}
        />
        <ConnectItem
          id="typeform"
          name="Typeform"
          iconClass="typeform"
          available={false}
          connected={false}
        />
        <ConnectItem
          id="zapier"
          name="Zapier"
          iconClass="zapier"
          available={false}
          connected={false}
        />
        <ConnectItem
          id="sms-feedback"
          name="SMS Feedback"
          iconClass="nps"
          available={false}
          connected={false}
        />
        <ConnectItem
          id="sms"
          name="SMS"
          iconClass="sms"
          available={false}
          connected={false}
        />
      </div>
    </>
  );
};

export default ConnectList;
