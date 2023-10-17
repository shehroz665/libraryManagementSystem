import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewcategoryComponent } from './viewcategory/viewcategory.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';

const routes: Routes = [
  {
    path:'view',component:ViewcategoryComponent
  },
  {
    path:'add',component:AddcategoryComponent
  },
  {
    path:'update',component:UpdatecategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
