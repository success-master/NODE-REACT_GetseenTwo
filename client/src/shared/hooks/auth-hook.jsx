import { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [accountId, setAccountId] = useState();
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [userGroups, setUserGroups] = useState(); //console.log(userGroups);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback(
    (token, uid, aid, isAdmin, groups, expirationDate) => {
      setToken(token);
      setUserId(uid);
      setAccountId(aid);
      setUserIsAdmin(isAdmin);
      setUserGroups(groups);

      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 2000 * 60 * 60 * 24);
      setTokenExpirationDate(tokenExpirationDate);

      localStorage.setItem(
        "userLoginStore",
        JSON.stringify({
          token: token,
          userId: uid,
          accountId: aid,
          adminUser: isAdmin,
          groups: groups,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setAccountId(null);
    setUserIsAdmin(false);
    setUserGroups([]);
    setTokenExpirationDate(null);

    localStorage.removeItem("userLoginStore");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userLoginStore"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.token,
        storedData.userId,
        storedData.accountId,
        storedData.adminUser,
        storedData.groups,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, userId, accountId, userIsAdmin, userGroups, login, logout };
};
