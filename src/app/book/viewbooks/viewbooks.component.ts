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
  searchTerm:string='';
  pageSize:number=10;
  from: number = 1;
  to: number = 10;
  collectionSize:number=0;
  roleId:number=0;
  updateIcon=faPenToSquare;
  trashIcon=faTrash;
  sizeIcon:SizeProp='1x';
  url:string=`https://localhost:7084/api/books?from=${this.from}&to=${this.to}&searchTerm=${this.searchTerm}`;
  books:any[]=[];
  constructor (private router:Router,private api:ApiMethodsService){
    this.getBooks();
    this.roleId=this.api.decodeToken();
  }
  getBooks(){
    this.api.getDataFromApi(this.url).subscribe((response:any)=>{
      this.collectionSize=response.data.count;
      this.books=response.data.data.map((book:any)=> ({
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
  pageChange(newPage:number){
    this.to=newPage*10;
    this.from=(this.to-10)+1;
    this.url=`https://localhost:7084/api/books?from=${this.from}&to=${this.to}`;
    this.getBooks();
  }
  onSearchChange(){
    this.url=`https://localhost:7084/api/books?from=${this.from}&to=${this.to}&searchTerm=${this.searchTerm}`;
    this.getBooks();
  }
}
