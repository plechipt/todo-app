import { gql } from "@apollo/client";
import { TODO_FIELDS_FRAGMENT } from "./fragment";

// Queries
export const TODO_LIST_QUERY = gql`
  query {
    todos {
      ...TodoFields
    }
  }
  ${TODO_FIELDS_FRAGMENT}
`;

export const TODO_USER_LIST_QUERY = gql`
  query {
    userTodos {
      ...TodoFields
    }
  }
  ${TODO_FIELDS_FRAGMENT}
`;

// Mutations
export const TODO_CREATE_MUTATION = gql`
  mutation($content: String!) {
    createTodo(content: $content) {
      todo {
        ...TodoFields
      }
    }
  }
  ${TODO_FIELDS_FRAGMENT}
`;

export const TODO_DELETE_MUTATION = gql`
  mutation($id: ID!) {
    deleteTodo(id: $id) {
      message
    }
  }
`;

export const TODO_TOGGLE_COMPLETED_MUTATION = gql`
  mutation($id: ID!) {
    toggleCompleted(id: $id) {
      todo {
        ...TodoFields
      }
    }
  }
  ${TODO_FIELDS_FRAGMENT}
`;
