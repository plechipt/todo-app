import "./App.css";

import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import CreateForm from "./components/CreateForm";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <CreateForm />
        <TodoList />
      </main>
    </div>
  );
}

export default App;
