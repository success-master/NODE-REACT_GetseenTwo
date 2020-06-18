import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Logo from "../../../assets/images/getseen_logo.svg";
import NavLinksBottom from "./NavLinksBottom";
import NavlinksTop from "./NavLinksTop";
import NavButtonsTop from "./NavButtonsTop";

const MainNavigation = (props) => {
  const auth = useContext(AuthContext); //console.log(auth)
  return (
    <>
      <div className="utility_menu_cont light">
        <div className="top_section_navigation">
          <NavButtonsTop {...auth} />

          <NavlinksTop {...auth} />
        </div>
        <div className="bottom_nav">
          <NavLinksBottom {...auth} />

          <div className="subtle_dividing_line navbar_less_margin" />
          <div className="logo_container w-inline-block w--current">
            <Link to="/reviews">
              <img src={Logo} alt="getseen-logo" className="logo" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNavigation;
