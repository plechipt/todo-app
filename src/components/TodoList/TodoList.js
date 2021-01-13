import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { TODO_USER_LIST_QUERY } from "../Api/todo/todo";
import { UpdateModeContext } from "./UpdateModeContext";
import MapTodos from "./MapTodos";
import Todo from "./Todo";
import UpdateForm from "./UpdateForm";

const TodoList = () => {
  const [updateMode, setUpdateMode] = useState(false);
  const { data: todos } = useQuery(TODO_USER_LIST_QUERY);

  const toggleUpdateMode = (id) => {
    setUpdateMode(true);
  };

  console.log(updateMode);

  return (
    <>
      {todos && todos.userTodos && updateMode === true ? (
        <UpdateModeContext.Provider value={{ toggleUpdateMode }}>
          <MapTodos todos={todos} />
        </UpdateModeContext.Provider>
      ) : (
        <>{updateMode ? <div>nigga</div> : null}</>
      )}
    </>
  );
};

export default TodoList;
