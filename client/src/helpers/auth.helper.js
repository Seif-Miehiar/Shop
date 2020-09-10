import { setCookie, getCookie, deleteCookie } from "./cookies.helper"
import { setLocalStorage, getLocalStorage, deleteLocalStorage } from './localStorage.helper';


export const setAuthentication = ( token, user ) => {
  setCookie("token", token);
  setLocalStorage("user", user);

}

export const isAuthenticated = () => {
  if (getCookie("token") && getLocalStorage("user")) {
    return getLocalStorage("user");
  } else{
    return false;
  }
}

export const logout = (next) => {
  deleteCookie("token");
  deleteLocalStorage("user");

  next();
}