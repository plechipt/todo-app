import React, { useState, useEffect, useMemo } from "react";
import { Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "./App.css";
import { USER_ME_QUERY } from "./components/Api/user";
import { UserContext } from "./components/UserContext";

import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList/TodoList";
import CreateForm from "./components/CreateForm";
import Paginator from "./components/Paginator";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";

const App = () => {
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  const { data: meQuery, loading } = useQuery(USER_ME_QUERY, {
    fetchPolicy: "network-only",
  });

  console.log(user, userValue);

  // Set user to memory
  useEffect(() => {
    if (meQuery && meQuery.me) {
      setUser(meQuery.me.username);
    }
  }, [meQuery]);

  return (
    <div className="App">
      <header>
        <UserContext.Provider value={userValue}>
          <Navbar />
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
              <Switch>
                <Route path="/register" component={() => <Register />} />
                <Route path="/" component={() => <Login />} />
              </Switch>
            ) : null}
          </>
        )}
      </main>
      <footer>{true && loading === false ? <Paginator /> : null}</footer>
    </div>
  );
};

export default App;
