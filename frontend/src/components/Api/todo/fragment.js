import { gql } from "@apollo/client";

export const TODO_FIELDS_FRAGMENT = gql`
  fragment TodoFields on TodoType {
    user {
      username
    }
    id
    content
    completed
  }
`;
