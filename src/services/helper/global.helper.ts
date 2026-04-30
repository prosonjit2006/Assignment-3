import Cookies from "js-cookie";
import { account } from "../../lib/Appwrite.config";

export const forceLogout = async () => {
  await account.deleteSession("current");
  Cookies.remove("token");
  Cookies.remove("role");
  Cookies.remove("userDetails");
  window.location.href = "/studentmanagement/login";
};
