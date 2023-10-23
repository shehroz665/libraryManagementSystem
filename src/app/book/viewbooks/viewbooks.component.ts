import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
@Component({
  selector: 'app-viewbooks',
  templateUrl: './viewbooks.component.html',
  styleUrls: ['./viewbooks.component.css']
})
export class ViewbooksComponent {
  updateIcon=faPenToSquare;
  trashIcon=faTrash;
  sizeIcon:SizeProp='1x';
  url:string=`https://localhost:7084/api/books/`;
  books:any[]=[];
  constructor (private router:Router,private api:ApiMethodsService){
    this.getBooks();
  }
  getBooks(){
    this.api.getDataFromApi(this.url).subscribe((response:any)=>{
      this.books=response.data.map((book:any)=> ({
        ...book,
        toggleValue:book.Status===1 ? true : false
      }));      
    });
  }
  toggleChanged(id:number){
    this.api.updateDataUsingApi(`https://localhost:7084/api/books/changeStatus/${id}`,{}).subscribe((response:any)=>{
      if(response.statuscode===200){
        this.api.successAlert(response.message);
        this.getBooks();
      }
      else{
        this.api.errorAlert(response.message);
      }
    });
    
  }
  goToUpdateView(id:number){
    this.router.navigate(['home/book/update',id]);
  }
  navigateToSpecificRoute(){
    this.router.navigate(["home/book/add"]);
  }
  deleteBook(data:any){
    var deleteUrl=this.url+`delete/${data.BookId}`;
    this.api.updateDataUsingApi(deleteUrl,{}).subscribe((response:any)=>{
      if(response.statuscode===200){
        this.api.successAlert(response.message);
        this.getBooks();
      }
      else{
        this.api.errorAlert(response.message);
      }
    });
  }
}
