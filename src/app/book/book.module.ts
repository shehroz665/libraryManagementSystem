import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { ViewbooksComponent } from './viewbooks/viewbooks.component';
import { AddbookComponent } from './addbook/addbook.component';
import { UpdatebookComponent } from './updatebook/updatebook.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgToggleModule } from 'ng-toggle-button';
import { IsbnFormatterPipe } from '../Pipes/isbn-formatter.pipe';
import { ApplyComponent } from './apply/apply.component';
import { NewComponent } from './new/new.component';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ViewbooksComponent,
    AddbookComponent,
    UpdatebookComponent,
    IsbnFormatterPipe,
    ApplyComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToggleModule,
    NgbDatepicker,
    MatTooltipModule,
    FormsModule
  ]
})
export class BookModule { }
