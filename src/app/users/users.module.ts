import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form/user-form.component';

// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // PrimeNG Modules
    TableModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  exports: [
    UsersComponent,
    UserFormComponent
  ]
})
export class UsersModule { }