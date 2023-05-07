import { gql } from "@apollo/client";

// Queries
export const USER_ME_QUERY = gql`
  query {
    me {
      username
    }
  }
`;

// Mutations
export const USER_REGISTER_MUTATION = gql`
  mutation ($username: String!, $password1: String!, $password2: String!) {
    register(
      input: {
        username: $username
        password1: $password1
        password2: $password2
      }
    ) {
      user {
        username
      }
      errors {
        messages
        field
      }
    }
  }
`;

export const USER_LOGIN_MUTATION = gql`
  mutation ($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      payload
      token
    }
  }
`;

export const USER_DELETE_TOKENS_MUTATION = gql`
  mutation {
    deleteTokenCookie {
      deleted
    }
    deleteRefreshTokenCookie {
      deleted
    }
  }
`;

export const USER_REFRESH_TOKEN_SILENTLY_MUTATION = gql`
  mutation {
    refreshToken {
      payload
    }
  }
`;
