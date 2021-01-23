import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "../Contexts/MessageContext";

const TextMessage = () => {
  const {
    messageValue: { message },
  } = useContext(MessageContext);
  console.log(message);

  return (
    <div>
      {typeof message === "string" ? (
        <>
          {message === "success" ? (
            <>{console.log("success my man!")}</>
          ) : (
            <>{console.log("no no")}</>
          )}
        </>
      ) : null}
    </div>
  );
};

export default TextMessage;
