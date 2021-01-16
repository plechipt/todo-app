import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Cookies from "js-cookie";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import {
  refreshTokenSilently,
  verifyAccessToken,
} from "./components/Api/axios";

const BASE_URL = "http://127.0.0.1:8000";
//const BASE_URL = "https://awesome-todoapp.herokuapp.com";

// Verify if access token expired
const customFetch = async (uri, options) => {
  const tokenExpired = await verifyAccessToken();

  if (tokenExpired === "true") {
    await refreshTokenSilently();
  }

  return fetch(uri, options);
};

const httpLink = createHttpLink({
  uri: `${BASE_URL}/graphql/`,
  credentials: "include",
  fetch: customFetch,
});

// Reset jwt token
const resetTokenLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) {
    refreshTokenSilently();
  }
});

// Access token is send through httponly cookie
const authLink = setContext((_, { headers }) => {
  // Get csrftoken from Cookies
  const csrftoken = Cookies.get("csrftoken");

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "X-CSRFToken": csrftoken,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
