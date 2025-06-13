import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_BOOKS } from '../../graphql/queries';
import { CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK } from '../../graphql/mutations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  loading = true;
  displayDialog = false;
  bookForm: any = {};
  isEditMode = false;
  categories: any[] = [];
  displayDetailsDialog = false;
  selectedBook: any = null;

  constructor(
    private apollo: Apollo,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.apollo.watchQuery<any>({
      query: GET_BOOKS,
      fetchPolicy: 'network-only' // Force a network request
    }).valueChanges.subscribe({
      next: (result) => {
        console.log('Books data:', result.data);
        this.books = result.data.books;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load books' });
        this.loading = false;
      }
    });
  }

  openNewBookDialog(): void {
    this.isEditMode = false;
    this.bookForm = {
      title: '',
      author: '',
      description: '',
      price: 0,
      stockQuantity: 0,
      publisher: '',
      publicationYear: new Date().getFullYear(),
      language: '',
      pageCount: 0
    };
    this.displayDialog = true;
  }

  editBook(book: any): void {
    this.isEditMode = true;
    this.bookForm = { ...book };
    this.displayDialog = true;
  }

  saveBook(): void {
    if (this.isEditMode) {
      this.updateBook();
    } else {
      this.createBook();
    }
  }

  createBook(): void {
    const input = { ...this.bookForm, categoryId: "1" }; // Default category ID
    
    this.apollo.mutate({
      mutation: CREATE_BOOK,
      variables: { input },
      refetchQueries: [{ query: GET_BOOKS }]
    }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book created successfully' });
        this.displayDialog = false;
        this.loadBooks();
      },
      error: (error) => {
        console.error('Error creating book:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create book' });
      }
    });
  }

  updateBook(): void {
    // Make sure we have the ID
    if (!this.bookForm.id) {
      console.error('Cannot update book: Missing ID');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Book ID is missing' });
      return;
    }
    
    // Create a clean input object with only the fields needed by the backend
    const input = {
      id: this.bookForm.id,
      title: this.bookForm.title,
      author: this.bookForm.author,
      description: this.bookForm.description,
      isbn: this.bookForm.isbn,
      price: this.bookForm.price,
      stockQuantity: this.bookForm.stockQuantity,
      publisher: this.bookForm.publisher,
      publicationYear: this.bookForm.publicationYear,
      language: this.bookForm.language,
      pageCount: this.bookForm.pageCount
    };
    
    // Add categoryId if available
    if (this.bookForm.category && this.bookForm.category.id) {
      input['categoryId'] = this.bookForm.category.id;
    } else if (this.bookForm.categoryId) {
      input['categoryId'] = this.bookForm.categoryId;
    } else {
      input['categoryId'] = "1"; // Default category ID
    }
    
    console.log('Update book input:', input);
    
    this.apollo.mutate({
      mutation: UPDATE_BOOK,
      variables: { input },
      refetchQueries: [{ query: GET_BOOKS }]
    }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book updated successfully' });
        this.displayDialog = false;
        this.loadBooks();
      },
      error: (error) => {
        console.error('Error updating book:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update book' });
      }
    });
  }

  deleteBook(book: any): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the book "${book.title}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apollo.mutate({
          mutation: DELETE_BOOK,
          variables: { id: book.id },
          refetchQueries: [{ query: GET_BOOKS }]
        }).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book deleted successfully' });
            this.loadBooks();
            this.confirmationService.close();
          },
          error: (error) => {
            console.error('Error deleting book:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete book' });
            this.confirmationService.close();
          }
        });
      }
    });
  }

  showBookDetails(book: any): void {
    this.selectedBook = book;
    this.displayDetailsDialog = true;
  }
}








