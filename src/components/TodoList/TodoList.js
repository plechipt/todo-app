import React, { useState, useMemo } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  TODO_USER_LIST_QUERY,
  TODO_GET_QUERY,
} from "../Api/resolvers/todo/todo";
import { UpdateModeContext } from "../Contexts/UpdateModeContext";
import MapTodos from "./MapTodos";
import UpdateForm from "./UpdateForm";

const TodoList = () => {
  const [updateMode, setUpdateMode] = useState(false);
  const updateModeValue = useMemo(() => ({ updateMode, setUpdateMode }), [
    updateMode,
    setUpdateMode,
  ]);

  const turnOnUpdateMode = (id) => {
    getTodo({ variables: { id } });
    setUpdateMode(true);
  };

  const [getTodo, { data: todo }] = useLazyQuery(TODO_GET_QUERY);
  const { data: todos } = useQuery(TODO_USER_LIST_QUERY);

  return (
    <>
      {todos && todos.userTodos && updateMode === false ? (
        <UpdateModeContext.Provider value={{ turnOnUpdateMode }}>
          <MapTodos todos={todos} />
        </UpdateModeContext.Provider>
      ) : (
        <>
          {updateMode && todo && todo.todo ? (
            <UpdateModeContext.Provider value={updateModeValue}>
              <UpdateForm todo={todo} />
            </UpdateModeContext.Provider>
          ) : null}
        </>
      )}
    </>
  );
};

export default TodoList;
