import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path:'view',component:ViewComponent
  },
  {
    path:'add',component:AddComponent
  },
  {
    path:'update/:id',component:UpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
