import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "./App.css";
import { USER_ME_QUERY } from "./components/Api/user";

import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import CreateForm from "./components/CreateForm";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";

const App = () => {
  const [user, setUser] = useState(null);
  const { data: meQuery, loading } = useQuery(USER_ME_QUERY, {
    fetchPolicy: "network-only",
  });

  // Set user to memory
  useEffect(() => {
    if (meQuery && meQuery.me) {
      setUser(meQuery.me.username);
    }
  }, [meQuery]);

  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        {user && loading === false ? (
          <>
            <CreateForm />
            <TodoList />
          </>
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
    </div>
  );
};

export default App;
