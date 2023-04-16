import axios from "axios";
import { useAuthStore } from "@/stores/auth";

export const apiWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

// const baseUrl = "http://localhost/esthermarisapi/api/v1";
// const baseUrl = "http://192.168.1.130/esthermarisapi/api/v1";
const baseUrl = "https://king.esthermaris.com/api/v1";

function request(method) {
  return async (url, body) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: authHeader(),
    };

    try {
      let response = {};
      switch (method) {
        case "POST":
          response = await axios.post(`${baseUrl}/${url}`, body, {
            headers: headers,
          });
          break;
        default:
          response = await axios.get(`${baseUrl}/${url}`, {
            headers: headers,
          });
          break;
      }

      const { logout } = useAuthStore();

      if (
        response.data.data == "Unauthenticated" ||
        response.data.data == "unauthenticated"
      ) {
        logout();
      }

      return response;
    } catch (err) {
      throw new Error(err.message);
    }
  };
}

function authHeader() {
  const { userToken } = useAuthStore();
  const isLoggedIn = !!userToken;
  if (isLoggedIn) {
    return `Bearer ${userToken}`;
  } else {
    return '';
  }
}
