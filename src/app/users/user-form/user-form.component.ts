import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../../graphql/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: ['']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private config: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private messageService: MessageService
  ) {
    this.userForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit() {
    const user = this.dialogConfig.data?.user;
    if (user) {
      this.isEditMode = true;
      // Don't include password in edit mode as we don't want to overwrite it
      // unless explicitly changed
      this.userForm.patchValue(user);
      
      // Make password optional in edit mode
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.setValidators(Validators.minLength(6));
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  closeDialog() {
    this.config.close();
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    const userData = this.userForm.value;

    if (this.isEditMode) {
      const updateData = { ...userData };
      if (!updateData.password || updateData.password.trim() === '') {
        delete updateData.password;
      }
      
      this.userService.updateUser(updateData).subscribe({
        next: (result: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User ${userData.name} updated successfully`
          });
          this.config.close(result.data.updateUser);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to update user: ${error.message}`
          });
          this.loading = false;
        }
      });
    } else {
      // Remove id for create operation
      const { id, ...createUserData } = userData;
      
      this.userService.createUser(createUserData).subscribe({
        next: (result: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User ${userData.name} created successfully`
          });
          this.config.close(result.data.createUser);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to create user: ${error.message}`
          });
          this.loading = false;
        }
      });
    }
  }
}




