import React from "react";
import { Route, Switch } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";

const AuthRoutes = () => {
  return (
    <div>
      <Grid fullWidth container spacing={3}>
        <Grid fullWidth item xs={5}>
          <Paper fullWidth>
            <Switch>
              <Route path="/register" component={() => <Register />} />
              <Route path="/" component={() => <Login />} />
            </Switch>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthRoutes;
