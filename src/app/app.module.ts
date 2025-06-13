import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';

// Components
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
// ... other components

// Feature Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContactUsModule } from './contact-us/contact-us.module';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import {MenubarModule} from "primeng/menubar";

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    GraphQLModule,
    // PrimeNG Modules
    ButtonModule,
    CardModule,
    DialogModule,
    DynamicDialogModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ProgressSpinnerModule,
    ToastModule,
    ConfirmDialogModule,
    MenubarModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

