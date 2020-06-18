import React from "react";

import MainNavigation from "./MainNavigation";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

const MainView = props => {
  return (
    <div className="main_view_wrapper">
      <MainNavigation />
      <div className="container_view_wrapper">
        <MainHeader />

        <div className="container-content">{props.children}</div>
        <MainFooter />
      </div>
    </div>
  );
};

export default MainView;
