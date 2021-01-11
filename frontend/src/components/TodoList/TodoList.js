import React from "react";
import { useQuery } from "@apollo/client";
import { TODO_USER_LIST_QUERY } from "../Api/todo/todo";
import MapTodos from "./MapTodos";

const TodoList = () => {
  const { data: todos } = useQuery(TODO_USER_LIST_QUERY);

  return <>{todos && todos.userTodos ? <MapTodos todos={todos} /> : null}</>;
};

export default TodoList;
