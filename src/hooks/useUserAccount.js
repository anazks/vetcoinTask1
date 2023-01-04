import React from "react";
import {
  authAccount,
  getInfo,
  unsubscribeAccountChange,
  subscribeAccountChange,
  invalidateAccount
} from "../models/user-account";

function useUserAccount() {
  const [
    account,
    setAccount
  ] = React.useState(getInfo());

  const _isMounted = React.useRef(false);

  React.useEffect(() => {
    _isMounted.current = true;

    const onNewData = () => {
      if (_isMounted.current) {
        const newInfo = getInfo();
        setAccount(newInfo);
      }
    };

    subscribeAccountChange(onNewData);

    return () => {
      _isMounted.current = false;
      unsubscribeAccountChange(onNewData);
    };
  }, []);

  return {
    account,
    authAccount,
    invalidateAccount
  }
}

export default useUserAccount;
