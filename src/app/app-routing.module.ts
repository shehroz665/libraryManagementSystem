// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './auth/login/login.component';
// import { NavbarComponent } from './navbar/navbar.component';

// const routes: Routes = [
//   {
//     path: '',redirectTo:'login',pathMatch:'full'
//   },
//   {
//     path:'login',component:LoginComponent
//   },
//   {
//     path:'home',component:NavbarComponent
//   },
//   {
//     path:'author',loadChildren:()=>import('./author/author.module').then((mob)=>mob.AuthorModule)
//   },
//   {
//     path:'book',loadChildren:()=>import('./book/book.module').then((mob)=>mob.BookModule)
//   },
//   {
//     path:'category',loadChildren:()=>import('./category/category.module').then((mob)=>mob.CategoryModule)
//   },
//   {
//     path:'student',loadChildren:()=>import('./student/student.module').then((mob)=>mob.StudentModule)
//   },
//   {
//     path:'transaction',loadChildren:()=>import('./transaction/transaction.module').then((mob)=>mob.TransactionModule)
//   },


// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/auth.guard';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: NavbarComponent,
    canActivate:[AuthGuard],
    children: [ 
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then((mob) => mob.AuthorModule)
      },
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then((mob) => mob.BookModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then((mob) => mob.CategoryModule)
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then((mob) => mob.StudentModule)
      },
      {
        path: 'transaction',
        loadChildren: () => import('./transaction/transaction.module').then((mob) => mob.TransactionModule)
      },
      
    ]

  },
  {
    path:"**",
    component:NopagefoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

