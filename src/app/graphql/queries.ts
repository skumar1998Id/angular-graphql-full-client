import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      phoneNumber
      address
      password
    }
  }
`;

export const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
      email
      phoneNumber
      address
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks {
    books {
       id
      title
      author
      description
      price
      stockQuantity
      publisher
      publicationYear
      language
      pageCount
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      description
      price
      stockQuantity
      publisher
      publicationYear
      language
      pageCount

    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;






