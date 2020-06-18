import React from "react";
import { Link } from "react-router-dom";

import "./Card.css";

const CUSTOM = ["card--disabled"];

const Card = ({ children, cardCustom, to = "" }) => {
  const checkCardCustom = CUSTOM.includes(cardCustom) ? cardCustom : null;
  return (
    <div className="utility_container">
      <Link to={to}>
        <div className={`card ${checkCardCustom}`}>{children}</div>
      </Link>
    </div>
  );
};

export default Card;
