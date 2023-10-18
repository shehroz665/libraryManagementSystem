import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { ViewtransactionComponent } from './viewtransaction/viewtransaction.component';
import { AddtransactionComponent } from './addtransaction/addtransaction.component';
import { UpdatetransactionComponent } from './updatetransaction/updatetransaction.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ViewtransactionComponent,
    AddtransactionComponent,
    UpdatetransactionComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class TransactionModule { }
