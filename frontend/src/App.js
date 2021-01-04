import "./App.css";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import CreateForm from "./components/CreateForm";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";

const App = () => {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        {true ? (
          <>
            <CreateForm />
            <TodoList />
          </>
        ) : (
          <>
            <Switch>
              <Route path="/login" component={() => <Login />} />
              <Route path="/register" component={() => <Register />} />
            </Switch>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
