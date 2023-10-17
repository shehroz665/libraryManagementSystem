import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'author',loadChildren:()=>import('./author/author.module').then((mob)=>mob.AuthorModule)
  },
  {
    path:'book',loadChildren:()=>import('./book/book.module').then((mob)=>mob.BookModule)
  },
  {
    path:'category',loadChildren:()=>import('./category/category.module').then((mob)=>mob.CategoryModule)
  },
  {
    path:'student',loadChildren:()=>import('./student/student.module').then((mob)=>mob.StudentModule)
  },
  {
    path:'transaction',loadChildren:()=>import('./transaction/transaction.module').then((mob)=>mob.TransactionModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
