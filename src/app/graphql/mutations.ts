import { gql } from 'apollo-angular';

export const CREATE_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation ($input: CreateBookInput!) {
    createBook(input: $input) {
      id
      title
      author
    }
  }
`;