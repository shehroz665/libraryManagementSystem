import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewbooksComponent } from './viewbooks/viewbooks.component';
import { AddbookComponent } from './addbook/addbook.component';
import { UpdatebookComponent } from './updatebook/updatebook.component';
import { ApplyComponent } from './apply/apply.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path:'view',component:ViewbooksComponent
  },
  {
    path:'add',component:AddbookComponent
  },
  {
    path:'apply',component:ApplyComponent
  },
  {
    path:'apply/new',component:NewComponent
  },
  {
    path:'update/:id',component:UpdatebookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
