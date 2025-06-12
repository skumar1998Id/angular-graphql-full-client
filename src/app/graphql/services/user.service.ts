import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USERS } from '../queries';
import { CREATE_USER } from '../mutations';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private apollo: Apollo) { }

  getUsers() {
    return this.apollo.watchQuery({ query: GET_USERS }).valueChanges;
  }

  createUser(user: any) {
    return this.apollo.mutate({ mutation: CREATE_USER, variables: { input: user } });
  }
}