import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // your template file
})
export class AppComponent implements OnInit {
  users: any[] = [];
  books: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    // Fetch users
    this.apollo.watchQuery<any>({
      query: gql`
        query GetUsers {
          users {
            id
            name
            email
          }
        }
      `
    }).valueChanges.subscribe(({ data, loading }) => {
      this.users = data.users;
    });

    // Fetch books
    this.apollo.watchQuery<any>({
      query: gql`
        query GetBooks {
          books {
            id
            title
            author
            price
          }
        }
      `
    }).valueChanges.subscribe(({ data, loading }) => {
      this.books = data.books;
    });
  }
}
