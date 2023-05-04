import React, { useState, useEffect } from "react";
import Paginator from "../Paginator";
import Todo from "./Todo";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const MapTodos = ({ todos: { userTodos: todos } }) => {
  const DEFAULT_TODOS = 5;
  const TODOS_PER_PAGE_ON_MOBILE = 4;
  const TODOS_PER_PAGE_ON_DESKTOP = 5;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  // Define pages
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(DEFAULT_TODOS);

  // Get current todos
  const indexOfLastTodos = currentPage * todosPerPage;
  const indexOfFirstTodos = indexOfLastTodos - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodos, indexOfLastTodos);

  useEffect(() => {
    if (matches) setTodosPerPage(TODOS_PER_PAGE_ON_DESKTOP);
    else setTodosPerPage(TODOS_PER_PAGE_ON_MOBILE);
  }, [matches]);

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
