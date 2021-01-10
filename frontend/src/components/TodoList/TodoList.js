import React from "react";
import { useQuery } from "@apollo/client";
import { TODO_USER_LIST_QUERY } from "../Api/todo/todo";
import Todo from "./Todo";

const TodoList = () => {
  const { data: todos } = useQuery(TODO_USER_LIST_QUERY);

  return (
    <div className="todo-container">
      {todos && todos.userTodos ? (
        <>
          {todos.userTodos.map(({ id, content, completed }) => {
            return <Todo id={id} content={content} completed={completed} />;
          })}
        </>
      ) : null}
    </div>
  );
};

export default TodoList;
