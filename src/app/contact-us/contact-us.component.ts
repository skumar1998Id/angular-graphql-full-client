import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.invalid) {
      return;
    }
    
    this.loading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Thank You!',
        detail: 'We have just received your concern/feedback. Our support team will reach out to you as soon as possible.',
        life: 5000
      });
      
      this.contactForm.reset();
      this.submitted = false;
      this.loading = false;
    }, 1000);
  }
  
  cancel() {
    this.contactForm.reset();
    this.submitted = false;
  }
}