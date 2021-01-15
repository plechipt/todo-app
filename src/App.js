import React, { useState, useEffect, useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_ME_QUERY } from "./components/Api/resolvers/user";
import { UserContext } from "./components/Contexts/UserContext";
import "./App.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";

import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList/TodoList";
import CreateForm from "./components/CreateForm";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";

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
    const mode = JSON.parse(localStorage.getItem("darkMode"));
    return mode || false;
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header>
          <UserContext.Provider value={userValue}>
            {true && loading === false ? (
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
                    <Route path="/register" component={() => <Register />} />
                    <Route path="/" component={() => <Login />} />
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
