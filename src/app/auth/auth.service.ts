import { Injectable, EventEmitter } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { UserService } from '../graphql/services/user.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Event emitter to notify components when auth status changes
  authStatusChanged = new EventEmitter<boolean>();

  constructor(
    private apollo: Apollo,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  register(userData: any): Observable<any> {
    // Remove confirmPassword as it's not needed in the database
    const { confirmPassword, ...userDataToSave } = userData;
    
    return this.userService.createUser(userDataToSave).pipe(
      map((result: any) => {
        return result.data.createUser;
      }),
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Registration Failed',
          detail: error.message || 'An error occurred during registration'
        });
        return throwError(() => error);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.userService.getUsers().pipe(
      map((result: any) => {
        const users = result.data.users;
        const user = users.find((u: any) => u.email === email);
        
        if (!user) {
          throw new Error('User not found');
        }
        console.log(password);
        console.log(user.password);
        console.log(user);
        if (user.password !== password) {
          throw new Error('Invalid password');
        }
        // Store user info in localStorage
        localStorage.setItem('auth_token', 'example_token');
        localStorage.setItem('user_id', user.id);
        localStorage.setItem('user_name', user.name);
        
        // Emit auth status change event
        this.authStatusChanged.emit(true);
        
        return user;
      }),
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: error.message || 'Invalid email or password'
        });
        return throwError(() => error);
      })
    );
  }

  resetPassword(email: string): Observable<boolean> {
    return this.userService.getUsers().pipe(
      map((result: any) => {
        const users = result.data.users;
        const user = users.find((u: any) => u.email === email);
        
        if (!user) {
          throw new Error('Email not found');
        }
        return true;
      }),
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Password Reset Failed',
          detail: error.message || 'An error occurred'
        });
        return throwError(() => error);
      })
    );
  }

  updatePassword(userId: string, newPassword: string): Observable<any> {
    return this.userService.updateUser({
      id: userId,
      password: newPassword
    }).pipe(
      map((result: any) => {
        return result.data.updateUser;
      }),
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Password Update Failed',
          detail: error.message || 'An error occurred'
        });
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    
    // Emit auth status change event
    this.authStatusChanged.emit(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getCurrentUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  getCurrentUserName(): string | null {
    return localStorage.getItem('user_name');
  }
}





