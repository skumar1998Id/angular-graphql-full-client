import { gql } from 'apollo-angular';

export const CREATE_USER = gql`
  mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      phoneNumber
      address
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      email
      phoneNumber
      address
    }
  }
`;

export const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const CREATE_BOOK = gql`
  mutation($input: CreateBookInput!) {
    createBook(input: $input) {
      id
      title
      author
      description
      isbn
      price
      stockQuantity
      publisher
      publicationYear
      language
      pageCount
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation($input: UpdateBookInput!) {
    updateBook(input: $input) {
      id
      title
      author
      description
      isbn
      price
      stockQuantity
      publisher
      publicationYear
      language
      pageCount
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation($id: ID!) {
    deleteBook(id: $id)
  }
`;
