import React, { useState, useEffect, useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_ME_QUERY } from "./components/Api/resolvers/user";
import { UserContext } from "./components/Contexts/UserContext";
import "./App.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList/TodoList";
import CreateForm from "./components/CreateForm";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import Register from "./components/Authentication/Register";

const App = () => {
  const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const [darkMode, setDarkMode] = useState(isDarkMode);

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
              <CreateForm />
              <TodoList />
            </UserContext.Provider>
          ) : (
            <>
              {loading === false ? (
                <div className="auth-container">
                  <Switch>
                    <Route
                      path="/old-register"
                      component={() => <Register />}
                    />
                    <Route path="/register" component={() => <SignUp />} />
                    <Route path="/" component={() => <SignIn />} />
                  </Switch>
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
