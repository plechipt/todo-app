import { gql } from "@apollo/client";

// Queries
export const TODO_LIST_QUERY = gql`
  query {
    todos {
      user {
        username
      }
      id
      content
      completed
    }
  }
`;

export const TODO_USER_LIST_QUERY = gql`
  query {
    userTodos {
      id
      content
      completed
    }
  }
`;
