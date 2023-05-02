import React, { useState } from "react";
import Paginator from "../Paginator";
import Todo from "./Todo";

const MapTodos = ({ todos: { userTodos: todos } }) => {
  const MOBILE_MARGIN = 50;
  const DESKTOP_MARGIN = 100;

  // Define pages
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);

  // Get current todos
  const indexOfLastTodos = currentPage * todosPerPage;
  const indexOfFirstTodos = indexOfLastTodos - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodos, indexOfLastTodos);

  return (
    <>
      <div className="todo-container">
        {currentTodos.map(({ id, content, completed }) => {
          return (
            <Todo key={id} id={id} content={content} completed={completed} />
          );
        })}
      </div>
      {todos.length > todosPerPage ? (
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
