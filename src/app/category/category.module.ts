import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToggleModule } from 'ng-toggle-button';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TokenInterceptor } from '../Interceptor/token.interceptor';

@NgModule({
  declarations: [
    ViewcategoryComponent,
    AddcategoryComponent,
    UpdatecategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgToggleModule,
    NgbPaginationModule,
    FormsModule,
    MatTooltipModule
    
  ]
  ,providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true,
    }
    ],
})
export class CategoryModule { }
