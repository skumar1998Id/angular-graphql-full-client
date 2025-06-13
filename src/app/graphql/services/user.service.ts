import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from '../mutations';
import { GET_USERS, GET_USER } from '../queries';

interface DeleteUserResponse {
  data?: {
    deleteUser: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getUsers() {
    return this.apollo.watchQuery({
      query: GET_USERS,
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  getUser(id: string) {
    return this.apollo.watchQuery({
      query: GET_USER,
      variables: { id },
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  createUser(userData: any): Observable<any> {
    return this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        input: userData
      },
      refetchQueries: [
        { query: GET_USERS }
      ]
    });
  }

  updateUser(userData: any): Observable<any> {
    const { id, ...input } = userData;
    return this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: {
        input: { ...input, id }
      },
      refetchQueries: [
        { query: GET_USERS }
      ]
    });
  }

  deleteUser(id: string): Observable<boolean> {
    return this.apollo.mutate<{ deleteUser: boolean }>({
      mutation: DELETE_USER,
      variables: {
        id
      },
      refetchQueries: [
        { query: GET_USERS }
      ]
    }).pipe(
      map((result) => result.data?.deleteUser || false)
    );
  }
}



