import React, { useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FaHistory } from "react-icons/fa";

import Header from "./Header";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import Button from "../FormElements/Button";
import Dropdown from "../FormElements/Dropdown";
import { GroupContext } from "../../context/group-store-context";
import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const MainHeader = () => {
  const auth = useContext(AuthContext);
  const { groups, dispatch } = useContext(GroupContext);

  const [loadedGroups, setLoadedGroups] = useState();
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();

  // provide dynamic App header title for each container in MainView
  const location = useLocation();
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
  };

  let currentPage = location.pathname.split("/");
  const [, a, b, c] = currentPage;
  console.log(a, b, c);

  const pageTitle = () => {
    if (c === "new") return `Add ${c} ${b}`;
    currentPage = currentPage.pop();
    return capitalize(currentPage);
  };

  const history = useHistory();
  const goTo = (id) => {
    console.log(id, currentPage);
    history.push(`/${auth.accountId}/${id}/${currentPage}`);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/groups/user/${auth.userId}`
        );

        setLoadedGroups(responseData.userGroups);
        console.log("mainheader");
        console.log(responseData.userGroups);
        dispatch({
          type: "AVAILABLE_GROUPS",
          payload: { availableGroups: responseData.userGroups },
        });
        dispatch({
          type: "SELECTED_GROUP",
          payload: { selectedGroup: responseData.userGroups[0] },
        });

        if (!sendRequest.ok) {
          throw new Error(sendRequest.message);
        }
      } catch (err) {}

      if (auth.userIsAdmin === true) {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/groups/account/${auth.accountId}`
          );
          console.log("debug2");
          console.log(responseData.accountGroups);
          dispatch({
            type: "ADMIN_AVAILABLE_GROUPS",
            payload: { adminAvailableGroups: responseData.accountGroups },
          });
          if (!sendRequest.ok) {
            throw new Error(sendRequest.message);
          }
        } catch (err) {}
      }
    };
    fetchGroups();
  }, [sendRequest, dispatch, auth.userId, auth.userIsAdmin, auth.accountId]);

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      <div className="header_wrapper">
        <Header title={pageTitle()} />
        <div className="container_nav_top">
          {/* <Button
            // disabled={true}
            buttonSize="btn--default"
            buttonMargin="btn--14px--right"
          >
            <div className="icon_header_button">
              {" "}
              <FaChartBar />{" "}
            </div>{" "}
            Report
          </Button> */}
          <Button buttonSize="btn--default" buttonMargin="btn--14px--right">
            <div className="icon_header_button">
              {" "}
              <FaHistory />{" "}
            </div>{" "}
            History
          </Button>

          {isLoading && (
            <div>
              <LoadingSpinner dark="dark" />
            </div>
          )}

          {!isLoading && loadedGroups && (
            <Dropdown
              data={groups.availableGroups}
              goTo={goTo}
              defaultValue={
                groups.availableGroups[0]
                  ? groups.availableGroups[0].groupName
                  : loadedGroups[0].groupName
              }
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainHeader;
