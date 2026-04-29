import Cookies from "js-cookie";

export const forceLogout = () => {
  Cookies.remove("token");
  Cookies.remove("role");
  Cookies.remove("userDetails");
  window.location.href = "/studentmanagement/login";
};
