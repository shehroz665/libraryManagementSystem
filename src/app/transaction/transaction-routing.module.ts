import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewtransactionComponent } from './viewtransaction/viewtransaction.component';
import { AddtransactionComponent } from './addtransaction/addtransaction.component';
import { UpdatetransactionComponent } from './updatetransaction/updatetransaction.component';

const routes: Routes = [
  {
    path:'view',component:ViewtransactionComponent
  },
  {
    path:'add',component:AddtransactionComponent
  },
  {
    path:'update',component:UpdatetransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
