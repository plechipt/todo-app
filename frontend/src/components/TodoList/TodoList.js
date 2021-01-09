import React from "react";
import { useQuery } from "@apollo/client";
import { TODO_USER_LIST_QUERY } from "../Api/todo";
import Todo from "./Todo";

const TodoList = () => {
  const { data: todos } = useQuery(TODO_USER_LIST_QUERY);

  if (todos) {
    todos.userTodos.forEach((todo) => {
      console.log(todo);
    });
  }

  return (
    <div className="todo-container">
      {todos && todos.userTodos ? (
        <>
          {todos.userTodos.map(({ content, completed }) => {
            return <Todo content={content} completed={completed} />;
          })}
        </>
      ) : null}
    </div>
  );
};

export default TodoList;
