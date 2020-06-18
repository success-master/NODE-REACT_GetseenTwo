import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Members from "./auth/containers/Members";
import ResetPassword from "./auth/containers/ResetPassword";
import MainView from "./shared/components/Navigation/MainView";
import Reviews from "./reviews/containers/Reviews";
import Feedback from "./feedback/containers/Feedback";
import Connect from "./connect/containers/Connect";
import Settings from "./settings/containers/Settings";
import Groups from "./groups/containers/Groups";
import Message from "./message/containers/Message";
import Templates from "./templates/containers/Templates";
import User from "./user/containers/User";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

import { AuthContext } from "./shared/context/auth-context";
import { CreateGroupContext } from "./shared/context/group-store-context";
import { useAuth } from "./shared/hooks/auth-hook";

// import ConnectGoogleMyBusiness from "./connect/containers/ConnectGoogleMyBusiness";
// import ConnectFacebook from "./connect/containers/ConnectFacebook";
// import GroupCreate from "./groups/containers/GroupCreate";
// import UserAccount from "./user/containers/UserAccount";
// import UserPreferences from "./user/containers/UserPreferences";
// import UserManage from "./user/containers/UserManage";
// import GroupManage from "./groups/containers/GroupManage";
// import TemplateCreate from "./templates/containers/TemplateCreate";
// import TemplateManage from "./templates/containers/TemplateManage";

const UserAccount = React.lazy(() => import("./user/containers/UserAccount"));
const UserManage = React.lazy(() => import("./user/containers/UserManage"));
const UserPreferences = React.lazy(() =>
  import("./user/containers/UserPreferences")
);
const GroupCreate = React.lazy(() => import("./groups/containers/GroupCreate"));
const GroupManage = React.lazy(() => import("./groups/containers/GroupManage"));
const ConnectGoogleMyBusiness = React.lazy(() =>
  import("./connect/containers/ConnectGoogleMyBusiness")
);
const ConnectFacebook = React.lazy(() =>
  import("./connect/containers/ConnectFacebook")
);
const TemplateCreate = React.lazy(() =>
  import("./templates/containers/TemplateCreate")
);
const TemplateManage = React.lazy(() =>
  import("./templates/containers/TemplateManage")
);

const App = () => {
  const {
    token,
    userId,
    accountId,
    userIsAdmin,
    userGroups,
    login,
    logout,
  } = useAuth();

  const groupId = userGroups && userGroups[0];

  let routes;

  if (token) {
    routes = (
      <Switch>
        <MainView>
          <Route path={`/:accountId/:groupId/reviews`} exact={true}>
            <Reviews />
          </Route>
          <Route path={`/:accountId/:groupId/feedback`} exact={true}>
            <Feedback />
          </Route>
          <Route path={`/:accountId/:groupId/settings`} exact={true}>
            <Settings />
          </Route>
          <Route path={`/:accountId/:groupId/connect`} exact={true}>
            <Connect />
          </Route>
          <Route path={`/:accountId/templates`} exact={true}>
            <Templates />
          </Route>
          <Route path={`/:accountId/template/create`} exact={true}>
            <TemplateCreate />
          </Route>
          <Route path={`/template/:templateId/manage`} exact={true}>
            <TemplateManage />
          </Route>

          <Route path={`/message/:groupId/new`} exact={true}>
            <Message />
          </Route>
          <Route path={`/:accountId/groups`} exact={true}>
            <Groups />
          </Route>
          <Route path={`/group/:accountId/create`} exact={true}>
            <GroupCreate />
          </Route>
          <Route path={`/group/:groupId/manage`} exact={true}>
            <GroupManage />
          </Route>
          <Route path={`/:accountId/:groupId/users`} exact={true}>
            <User />
          </Route>
          <Route path={`/user/:userId/manage`} exact={true}>
            <UserManage />
          </Route>
          <Route path={`/:accountId/:userId/my-account`} exact={true}>
            <UserAccount />
          </Route>
          <Route path={`/:accountId/:userId/my-preferences`} exact={true}>
            <UserPreferences />
          </Route>
          <Route path={`/connect/:groupId/google-my-business`} exact={true}>
            <ConnectGoogleMyBusiness />
          </Route>
          <Route
            path={`/connect/:groupId/facebook-recommendations`}
            exact={true}
          >
            <ConnectFacebook />
          </Route>
          {/* <Redirect to={`/${accountId}/${groupId}/reviews`} /> */}
          <Redirect to={`/${accountId}/${groupId}/feedback`} />
        </MainView>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/members" exact>
          <Members />
        </Route>
        <Route path="/accounts/reset-password" exact>
          <ResetPassword />
        </Route>
        <Redirect to="/members" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userId,
        token: token,
        accountId,
        userIsAdmin,
        userGroups,
        login,
        logout,
      }}
    >
      <CreateGroupContext>
        <Router>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner dark="dark" />
              </div>
            }
          >
            {routes}
          </Suspense>
        </Router>
      </CreateGroupContext>
    </AuthContext.Provider>
  );
};

export default App;
