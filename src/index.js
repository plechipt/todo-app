import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const EXPIRES_IN_ONE_YEAR = 360;

/*
// Verify if access token expired
const customFetch = async (uri, options) => {
  const tokenExpired = await verifyAccessToken();

  if (tokenExpired === "true") {
    await refreshTokenSilently();
  }

  return fetch(uri, options);
};
*/

const checkSessionID = () => {
  const sessionID = Cookies.get("session-id");

  if (sessionID === undefined) {
    Cookies.set("session-id", uuidv4(), {
      expires: EXPIRES_IN_ONE_YEAR,
      sameSite: "None",
      secure: true,
      path: "/",
    });
  }
};

const httpLink = createHttpLink({
  uri: `${BASE_URL}/graphql/`,
  //fetch: customFetch,
});

// Access token is send through httponly cookie
const authLink = setContext((_, { headers }) => {
  checkSessionID();

  // Get cookies
  const token = Cookies.get("token");
  const csrftoken = Cookies.get("csrftoken");
  const sessionID = Cookies.get("session-id");

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "X-CSRFToken": csrftoken,
      "X-Session-Id": sessionID,
      Authorization: token ? `JWT ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "include",
});

ReactDOM.render(
  <>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </>,
  document.getElementById("root")
);
