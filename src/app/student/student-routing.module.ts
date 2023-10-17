import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewstudentComponent } from './viewstudent/viewstudent.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { UpdatestudentComponent } from './updatestudent/updatestudent.component';

const routes: Routes = [
  {
    path:'view',component:ViewstudentComponent
  },
  {
    path:'add',component:AddstudentComponent
  },
  {
    path:'update',component:UpdatestudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
