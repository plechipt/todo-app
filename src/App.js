import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_ME_QUERY } from "./components/Api/resolvers/user";
import { MessageContext } from "./components/Contexts/MessageContext";
import { LanguageContext } from "./components/Contexts/LanguageContext";

import "./App.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Navbar from "./components/Navbar/Navbar";
const TextMessage = lazy(() => import("./components/Payments/TextMessage"));
const CreateForm = lazy(() => import("./components/CreateForm"));
const TodoList = lazy(() => import("./components/TodoList/TodoList"));
const SignIn = lazy(() => import("./components/Authentication/SignIn"));
const SignUp = lazy(() => import("./components/Authentication/SignUp"));

const App = () => {
  const [darkMode, setDarkMode] = useState(getThemeMode());
  const [englishSelected, setEnglishSelected] = useState(getLanguage());
  const englishSelectedValue = useMemo(
    () => ({ englishSelected, setEnglishSelected }),
    [englishSelected, setEnglishSelected]
  );

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const messageValue = useMemo(
    () => ({ message, setMessage }),
    [message, setMessage]
  );

  const { data: meQuery, loading } = useQuery(USER_ME_QUERY, {
    fetchPolicy: "network-only",
  });

  // Set user to memory
  useEffect(() => {
    if (meQuery && meQuery.me) {
      setUser(meQuery.me.username);
    }
  }, [meQuery]);

  // Set theme mode on change to local storage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("englishSelected", JSON.stringify(englishSelected));
  }, [englishSelected]);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: "#1976D2",
            "&:hover": {
              background: "#1976D2",
            },
          },
          type: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  function getThemeMode() {
    let mode = localStorage.getItem("darkMode");

    if (mode === "true" || mode === "false") {
      return JSON.parse(mode);
    } else {
      return false;
    }
  }

  function getLanguage() {
    let language = localStorage.getItem("englishSelected");

    if (language === "true" || language === "false") {
      return JSON.parse(language);
    } else {
      return true;
    }
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header>
          {user && loading === false ? (
            <LanguageContext.Provider value={englishSelectedValue}>
              <MessageContext.Provider value={messageValue}>
                <Navbar
                  user={user}
                  setEnglishSelected={setEnglishSelected}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              </MessageContext.Provider>
            </LanguageContext.Provider>
          ) : null}
        </header>
        <main>
          {user && loading === false ? (
            <LanguageContext.Provider value={englishSelectedValue}>
              <MessageContext.Provider value={messageValue}>
                <Suspense fallback={<div>Loading...</div>}>
                  <TextMessage />
                  <CreateForm />
                  <TodoList />
                </Suspense>
              </MessageContext.Provider>
            </LanguageContext.Provider>
          ) : (
            <>
              {loading === false ? (
                <div className="auth-container">
                  <LanguageContext.Provider value={englishSelectedValue}>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Switch>
                        <Route path="/register" component={() => <SignUp />} />
                        <Route path="/" component={() => <SignIn />} />
                      </Switch>
                    </Suspense>
                  </LanguageContext.Provider>
                </div>
              ) : null}
            </>
          )}
        </main>
      </ThemeProvider>
    </div>
  );
};

export default App;
