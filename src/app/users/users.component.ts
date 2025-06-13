import { Component, OnInit } from '@angular/core';
import { UserService } from '../graphql/services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DialogService]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  ref: DynamicDialogRef | undefined;
  loading = true;

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: ({ data }: any) => {
        this.users = data.users;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to load users: ${error.message}`
        });
        this.loading = false;
      }
    });
  }

  createUser() {
    this.ref = this.dialogService.open(UserFormComponent, {
      header: 'Create New User',
      width: '450px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((user) => {
      if (user) {
        this.loadUsers();
      }
    });
  }

  editUser(user: any) {
    this.ref = this.dialogService.open(UserFormComponent, {
      header: 'Edit User',
      width: '450px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        user: user
      }
    });

    this.ref.onClose.subscribe((updatedUser) => {
      if (updatedUser) {
        this.loadUsers();
      }
    });
  }

  deleteUser(user: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.name}?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe({
          next: (success) => {
            if (success) {
              this.messageService.add({
                severity: 'success',
                summary: 'Deleted',
                detail: `User ${user.name} has been deleted`
              });
              this.loadUsers();
              // Explicitly hide the confirmation dialog
              this.confirmationService.close();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete user'
              });
              // Also close on error
              this.confirmationService.close();
            }
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Failed to delete user: ${error.message}`
            });
            // Close on error
            this.confirmationService.close();
          }
        });
      },
      reject: () => {
        // Optional: handle rejection
        this.confirmationService.close();
      }
    });
  }
}






