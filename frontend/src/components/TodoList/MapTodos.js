import React, { useState } from "react";
import Paginator from "./Paginator";
import Todo from "./Todo";

const MapTodos = ({ todos: { userTodos: todos } }) => {
  // Define pages
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(4);

  // Get current todos
  const indexOfLastTodos = currentPage * todosPerPage;
  const indexOfFirstTodos = indexOfLastTodos - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodos, indexOfLastTodos);

  console.log(todos.length);

  return (
    <>
      <div className="todo-container">
        {currentTodos.map(({ id, content, completed }) => {
          return <Todo id={id} content={content} completed={completed} />;
        })}
      </div>
      {todos.length > 4 ? (
        <div className="pagination-container">
          <Paginator
            todosPerPage={todosPerPage}
            totalTodos={todos.length}
            handlePaginationChange={(e, value) => setCurrentPage(value)}
          />
        </div>
      ) : null}
    </>
  );
};

export default MapTodos;
