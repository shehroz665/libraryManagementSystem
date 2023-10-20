import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { StudentModule } from './student/student.module';
import { TransactionModule } from './transaction/transaction.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgToggleModule } from 'ng-toggle-button';
import { LoginComponent } from './auth/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent //newly added
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AuthorModule,
    BookModule,
    CategoryModule,
    StudentModule,
    TransactionModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgToggleModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
