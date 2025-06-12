import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_BOOKS } from '../queries';
import { CREATE_BOOK } from '../mutations';

@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private apollo: Apollo) { }

  getBooks() {
    return this.apollo.watchQuery({ query: GET_BOOKS }).valueChanges;
  }

  createBook(book: any) {
    return this.apollo.mutate({ mutation: CREATE_BOOK, variables: { input: book } });
  }
}