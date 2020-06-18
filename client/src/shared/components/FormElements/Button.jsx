import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const STYLES = [
  "btn--default--light",
  "btn--default--dark",
  "btn--default--danger",
  "btn--default--success",
];

const SIZES = ["btn--default", "btn--small"];

const MARGINS = ["btn--14px--right", "btn--14px--left"];

const CUSTOM = [
  "btn--wide",
  "btn--notice",
  "btn--auth",
  "btn--auth--float",
  "btn--respond--default",
];
// TODO Add 'btn--hidden' custom style

const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  disabled,
  buttonSize,
  buttonMargin,
  buttonCustom,
  to,
  href,
  exact,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[1];

  const checkButtonMargin = MARGINS.includes(buttonMargin)
    ? buttonMargin
    : null;

  const checkCustom = CUSTOM.includes(buttonCustom)
    ? buttonCustom
    : () => {
        console.log("No custom class added");
        return null;
      };

  if (href) {
    return (
      <a
        className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonMargin} ${checkCustom}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        exact={exact}
        className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonMargin} ${checkCustom}`}
      >
        {children}
      </Link>
    );
  } else
    return (
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonMargin} ${checkCustom}`}
        onClick={onClick}
        type={type || "button"}
        disabled={disabled}
      >
        {children}
      </button>
    );
};

export default Button;
