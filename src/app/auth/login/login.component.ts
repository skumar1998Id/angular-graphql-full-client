import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DialogService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '/books';
  ref: DynamicDialogRef | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService,
    private dialogService: DialogService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/books']);
    }
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/books';
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password).subscribe({
      next: (user) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Login Successful',
          detail: `Welcome back, ${user.name}!`,
          life: 3000
        });
        
        this.loading = false;
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.loading = false;
      }
    });
  }

  forgotPassword() {
    this.ref = this.dialogService.open(ForgotPasswordComponent, {
      header: 'Reset Password',
      width: '400px',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.messageService.add({
          severity: 'info',
          summary: 'Password Reset Requested',
          detail: 'Check your email for instructions to reset your password.',
          life: 5000
        });
      }
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}




