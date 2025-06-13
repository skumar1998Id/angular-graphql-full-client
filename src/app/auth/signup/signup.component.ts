import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    }, {
    });
  }

  ngOnInit(): void {
  }


  onSubmit() {
    this.submitted = true;
    
    if (this.signupForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    this.authService.register(this.signupForm.value).subscribe({
      next: (user) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registration Successful',
          detail: 'Your account has been created. Please login.',
          life: 3000
        });
        
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loading = false;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}






