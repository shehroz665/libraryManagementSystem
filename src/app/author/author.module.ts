import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    ViewComponent,
    AddComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class AuthorModule { }
