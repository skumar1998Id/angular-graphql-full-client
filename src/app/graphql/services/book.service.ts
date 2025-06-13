import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK } from '../mutations';
import { GET_BOOKS, GET_BOOK } from '../queries';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private apollo: Apollo) {}

  getBooks() {
    return this.apollo.watchQuery({
      query: GET_BOOKS,
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  getBook(id: string) {
    return this.apollo.watchQuery({
      query: GET_BOOK,
      variables: { id },
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  createBook(bookData: any) {
    return this.apollo.mutate({
      mutation: CREATE_BOOK,
      variables: {
        input: bookData
      },
      refetchQueries: [
        { query: GET_BOOKS }
      ]
    });
  }

  updateBook(bookData: any) {
    // Extract the ID
    const { id } = bookData;
    
    // Create a clean copy of the data without Apollo-specific fields
    const cleanData = {};
    
    // Only include fields that are expected by the backend
    const allowedFields = [
      'title', 
      'author', 
      'description', 
      'isbn', 
      'price', 
      'stockQuantity', 
      'publisher', 
      'publicationYear', 
      'language', 
      'pageCount',
      'categoryId'
    ];
    
    // Copy only the allowed fields
    allowedFields.forEach(field => {
      if (bookData[field] !== undefined) {
        cleanData[field] = bookData[field];
      }
    });
    
    // Add categoryId if it exists in the category object
    if (bookData.category && bookData.category.id) {
      cleanData['categoryId'] = bookData.category.id;
    }
    
    // Add the ID to the clean data
    const input = { ...cleanData, id };
    
    console.log('Update book input:', input);
    
    return this.apollo.mutate({
      mutation: UPDATE_BOOK,
      variables: { input },
      refetchQueries: [
        { query: GET_BOOKS }
      ]
    });
  }

  deleteBook(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_BOOK,
      variables: { id },
      refetchQueries: [
        { query: GET_BOOKS }
      ]
    });
  }
}





