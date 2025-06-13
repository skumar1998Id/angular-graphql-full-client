import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Bookstore GraphQL';
  items: MenuItem[] = [];
  cartItemCount = 0;
  private authSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initializeMenu();
    
    // Subscribe to auth status changes
    this.authSubscription = this.authService.authStatusChanged.subscribe(
      (isLoggedIn: boolean) => {
        this.initializeMenu();
      }
    );
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  initializeMenu() {
    // Only initialize menu items if user is logged in
    if (this.isLoggedIn()) {
      this.items = [
        {
          label: 'Books',
          icon: 'pi pi-book',
          routerLink: '/books'
        },
       /* {
          label: 'Users',
          icon: 'pi pi-users',
          routerLink: '/users'
        },*/
        {
          label: 'Contact Us',
          icon: 'pi pi-envelope',
          routerLink: '/contact'
        }
      ];
    } else {
      this.items = [];
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserName(): string {
    return this.authService.getCurrentUserName() || 'User';
  }
}





