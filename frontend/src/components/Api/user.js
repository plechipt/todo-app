import { gql } from "@apollo/client";

export const USER_ME_QUERY = gql`
  query {
    me {
      username
    }
  }
`;
