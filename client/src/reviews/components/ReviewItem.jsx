import React from "react";
import { FaStar, FaReply } from "react-icons/fa";

import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_MINLENGTH } from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";

const ReviewItem = (props) => {
  //console.log(props)
  const [formState, inputHandler] = useForm(
    {
      reviewResponse: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const responseSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    console.log("Sending review response...");
  };

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
          <div className="dynamic_icons google" />
        </div>
        <h4 className="reviewer">{props.reviewer}</h4>
        <div className="google_rating">
          {/* TODO dynamically render stars based on rating && criteria of review origin */}
          {[...Array(5)].map((x, i) => {
            //console.log(props.rating > i, i);
            return (
              <div className="reviewStar">
                <FaStar
                  key={i}
                  color={props.rating > i ? "#F9B404" : "#E7E7E7"}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="customer_comment max_width">{props.body}</div>
      <div className="subtle_dividing_line" />

      <form onSubmit={responseSubmitHandler} className="reply-box">
        <Input
          id="reviewResponse"
          element="respond"
          type="text"
          placeholder="Type your response..."
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please write a review resonse with at least 12 characters."
          inputClass="dynamic_message_reply connected"
          onInput={inputHandler}
          togglesClass="disable-settings-toggles"
        />

        <Button
          type="submit"
          buttonSize="btn--default"
          // buttonStyle="btn--dx`efault--dark"
          buttonCustom="btn--respond--default"
          disabled={!formState.isValid}
        >
          <div className="icon_header_button">
            {" "}
            <FaReply />{" "}
          </div>{" "}
          Reply
        </Button>

        {/* TODO implement useForm into review component */}
      </form>
    </div>
  );
};

export default ReviewItem;
