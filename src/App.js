import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_ME_QUERY } from "./components/Api/resolvers/user";
import { UserContext } from "./components/Contexts/UserContext";
import "./App.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Navbar from "./components/Navbar/Navbar";
const CreateForm = lazy(() => import("./components/CreateForm"));
const TodoList = lazy(() => import("./components/TodoList/TodoList"));
const SignIn = lazy(() => import("./components/Authentication/SignIn"));
const SignUp = lazy(() => import("./components/Authentication/SignUp"));

const App = () => {
  const [darkMode, setDarkMode] = useState(getThemeMode());

  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

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

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
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

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header>
          <UserContext.Provider value={userValue}>
            {user && loading === false ? (
              <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            ) : null}
          </UserContext.Provider>
        </header>
        <main>
          {user && loading === false ? (
            <UserContext.Provider value={userValue}>
              <Suspense fallback={<div>Loading...</div>}>
                <CreateForm />
                <TodoList />
              </Suspense>
            </UserContext.Provider>
          ) : (
            <>
              {loading === false ? (
                <div className="auth-container">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                      <Route path="/register" component={() => <SignUp />} />
                      <Route path="/" component={() => <SignIn />} />
                    </Switch>
                  </Suspense>
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
