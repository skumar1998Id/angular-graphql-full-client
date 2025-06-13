import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { BookService } from '../../graphql/services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      isbn: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      publisher: ['', Validators.required],
      publicationYear: [new Date().getFullYear(), Validators.required],
      language: ['', Validators.required],
      pageCount: [0]
    });
  }

  ngOnInit(): void {
    if (this.config.data?.book) {
      this.isEditMode = true;
      const book = this.config.data.book;
      
      this.bookForm.patchValue({
        title: book.title,
        author: book.author,
        description: book.description,
        isbn: book.isbn,
        price: book.price,
        stockQuantity: book.stockQuantity,
        categoryId: book.category?.id || '',
        publisher: book.publisher,
        publicationYear: book.publicationYear,
        language: book.language,
        pageCount: book.pageCount
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      Object.keys(this.bookForm.controls).forEach(key => {
        this.bookForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    const bookData = this.bookForm.value;

    if (this.isEditMode) {
      bookData.id = this.config.data.book.id;
      this.bookService.updateBook(bookData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book updated successfully' });
          this.ref.close(true);
        },
        error: (error) => {
          console.error('Error updating book:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update book' });
          this.loading = false;
        }
      });
    } else {
      this.bookService.createBook(bookData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Book created successfully' });
          this.ref.close(true);
        },
        error: (error) => {
          console.error('Error creating book:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create book' });
          this.loading = false;
        }
      });
    }
  }
}


