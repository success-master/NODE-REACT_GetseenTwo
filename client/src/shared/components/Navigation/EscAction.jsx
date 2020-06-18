import { useEffect, useCallback } from "react";
import { withRouter } from "react-router";

const EscAction = props => {
  const escFunction = useCallback(event => {
    if (event.keyCode === 27) {
      props.history.goBack();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
};

export default withRouter(EscAction);
