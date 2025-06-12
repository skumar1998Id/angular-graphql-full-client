import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
      price
    }
  }
`;