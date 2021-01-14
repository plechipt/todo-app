import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { TODO_USER_LIST_QUERY, TODO_GET_QUERY } from "../Api/todo/todo";
import { UpdateModeContext } from "../Contexts/UpdateModeContext";
import MapTodos from "./MapTodos";
import UpdateForm from "./UpdateForm";

const TodoList = () => {
  const [updateMode, setUpdateMode] = useState(false);
  const [getTodo, { data: todo }] = useLazyQuery(TODO_GET_QUERY);
  const { data: todos } = useQuery(TODO_USER_LIST_QUERY);

  const toggleUpdateMode = (id) => {
    getTodo({ variables: { id } });
    setUpdateMode(!updateMode);
  };

  return (
    <>
      {todos && todos.userTodos && updateMode === false ? (
        <UpdateModeContext.Provider value={{ toggleUpdateMode }}>
          <MapTodos todos={todos} />
        </UpdateModeContext.Provider>
      ) : (
        <>
          {updateMode && todo && todo.todo ? (
            <UpdateModeContext.Provider value={{ toggleUpdateMode }}>
              <UpdateForm todo={todo} />
            </UpdateModeContext.Provider>
          ) : null}
        </>
      )}
    </>
  );
};

export default TodoList;
