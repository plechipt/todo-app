import "./App.css";

import Navbar from "./components/Navbar";
import Todo from "./components/Todo";

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <Todo />
      </main>
    </div>
  );
}

export default App;
