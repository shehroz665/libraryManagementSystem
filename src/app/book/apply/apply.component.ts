import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {
  roleId:number=0;
  url:string=`https://localhost:7084/api/books/`;
  books:any[]=[];
  constructor (private router:Router,private api:ApiMethodsService){
    this.getBorrowedBooks();
    this.roleId=this.api.decodeToken();
  }
  getBorrowedBooks(){
    this.api.getDataFromApi(this.url).subscribe((response:any)=>{
      this.books=response.data.map((book:any)=> ({
        ...book,
        toggleValue:book.Status===1 ? true : false
      }));      
    });
  }
  navigateToSpecificRoute(){
    this.router.navigate(["home/book/apply/new"]);
  }
}
