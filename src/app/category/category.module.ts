import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewcategoryComponent,
    AddcategoryComponent,
    UpdatecategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }
