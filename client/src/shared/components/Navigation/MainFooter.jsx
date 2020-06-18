import React from "react";
import { Link } from "react-router-dom";
import Emoji from "../FormElements/Emoji";

const MainFooter = () => {
  return (
    <div className="container_footer">
      <div className="footer_emoji_container">
        Made with <Emoji label="wind" symbol="💨" /> on
        <Emoji label="earth america" symbol="🌍" />
      </div>
      <a
        href="mailto:hello@getseen.co.uk?subject=I've%20clicked%20on%20your%20in-app%20footer%2C%20hello!"
        className="footer_app_link"
      >
        support@getseen.co.uk
      </a>
      <Link to="" className="footer_app_link">
        privacy
      </Link>
      <Link to="" className="footer_app_link">
        terms
      </Link>
    </div>
  );
};

export default MainFooter;
