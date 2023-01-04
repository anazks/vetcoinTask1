import EventEmitter from "../utils/event-emitter";
import { EventEmitterName } from "../utils/constants";

const storageKey = "authInfo";

let data = {
  email : "",
  firstName : "",
  referlink : "",
  created_at : "",
  ecosystem_uuid : ""
};

const onAccountChange = () => {
  const newData = { ...data };
  EventEmitter.emit(EventEmitterName.UserSessionChange, newData);
};

const clearData = () => {
  data = {
    email : "",
    firstName : "",
    referlink : "",
    created_at : "",
    ecosystem_uuid : ""
  };

  localStorage.removeItem(storageKey);
};

const authAccount = (email, firstName, referlink, createdAt, ecosystemUuid) => {
  data = {
    email,
    firstName,
    referlink,
    created_at : createdAt,
    ecosystem_uuid : ecosystemUuid
  };

  const storageStr = JSON.stringify(data);
  localStorage.setItem(storageKey, storageStr);

  onAccountChange();
};

const loadStorage = () => {
  const dataStr = localStorage.getItem(storageKey);
  if (dataStr) {
    const storageData = JSON.parse(dataStr);
    data = storageData;

    onAccountChange();
  }
};

const invalidateAccount = async () => {
  clearData();
  onAccountChange();
};

const getInfo = () => ({ ...data });

const subscribeAccountChange = (onChange) => {
  EventEmitter.subscribe(EventEmitterName.UserSessionChange, onChange);
};

const unsubscribeAccountChange = (onChange)  => {
  EventEmitter.unsubscribe(EventEmitterName.UserSessionChange, onChange);
};

loadStorage();

export {
  subscribeAccountChange,
  unsubscribeAccountChange,
  authAccount,
  invalidateAccount,
  getInfo
}
