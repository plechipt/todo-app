import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const refreshTokenSilently = async () => {
  const csrftoken = Cookies.get("csrftoken");

  await axios({
    url: `${BASE_URL}/graphql/`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    data: {
      query: `
        mutation refreshTokenSilently {
          refreshToken {
            payload
          }
        }
      `,
    },
  });
};

export const verifyAccessToken = async () => {
  const csrftoken = Cookies.get("csrftoken");

  const { data } = await axios({
    url: `${BASE_URL}/graphql/`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    data: {
      query: `
        mutation {
          verifyAccessToken {
            isExpired
          }
        }
      `,
    },
  });
  const {
    data: {
      verifyAccessToken: { isExpired },
    },
  } = data;

  return isExpired;
};
