import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private authService: AuthService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.resetForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    const email = this.resetForm.get('email')?.value;
    
    this.authService.resetPassword(email).subscribe({
      next: (success) => {
        this.loading = false;
        this.ref.close(true);
      },
      error: (error) => {
        this.loading = false;
      }
    });
  }

  cancel() {
    this.ref.close(false);
  }
}

