import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Cookies from "js-cookie";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const BASE_URL = process.env.REACT_APP_BASE_URL;

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

const httpLink = createHttpLink({
  uri: `${BASE_URL}/graphql/`,
  //fetch: customFetch,
});

// Access token is send through httponly cookie
const authLink = setContext((_, { headers }) => {
  const csrftoken = Cookies.get("csrftoken");
  const token = Cookies.get("token");

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "X-CSRFToken": csrftoken,
      Authorization: `JWT ${token}`,
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
