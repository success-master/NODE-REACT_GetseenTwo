import React from "react";
import Emoji from "../../shared/components/FormElements/Emoji";
// import { FaStar, FaReply } from "react-icons/fa";

const FeedbackItem = (props) => {
  return (
    <div className="tile_default">
      <div className="top-sec-review-tile">
        <div className="team_info _50_opacity">
          <div className="navigation-icon hide"></div>
          <div className="team_id">{props.group}</div>
        </div>
        <div className="time_stamp">
          <div className="time_stamp_text _50_opacity">{props.date}</div>
        </div>
      </div>
      <div className="review_icon_name_star_rating">
        <div className="team_info">
          <div className="feedback_dynamic_rating">
            <div className="icon_feedback_tile">{props.score}</div>
          </div>
        </div>
        <h4 className="customer_name_feedback">{props.customer}</h4>
      </div>
      <div className="customer_comment max_width">
        {props.body}
        {/* <a href="/">
          TODO: Add substring dynamically based on props.body .length callout
          <span className="substring_link">Show More</span>
        </a> */}
      </div>

      <div className="subtle_dividing_line"></div>
      <div className="reply-box">
        <div className="dynamic_message_wrapper">
          <div className="dynamic_notification_message_icon">
            <Emoji label="look" symbol="👀" />
          </div>
          <div className="notice-text">
            {props.customer} left their feedback via{" "}
            <span className="dynamic_contact_data">{props.from}.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackItem;
