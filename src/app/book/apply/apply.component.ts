import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
import { faCheck,faXmark,faRotateLeft,faCircleCheck,faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {
  constructor (private router:Router,private api:ApiMethodsService){
    this.getBorrowedBooks();
    this.getBooksDropdown();
  }
  approvedIcon=faCheck;
  rejectedIcon=faXmark;
  returnedIcon=faRotateLeft;
  checkedIcon=faCircleCheck;
  isRejectedIcon=faCircleXmark;
  sizeIcon:SizeProp='1x';
  booksTitle:any[]=[];
  statusArray:any[]=[
    {id:1,status:'All',code:0},
    {id:2,status:'Pending',code:1},
    {id:3,status:'Approved',code:2},
    {id:4,status:'Returned',code:3},
    {id:4,status:'Rejected',code:4},  
  ];
  selectedStatus:number=0;
  selectedBook:number=0;
  searchTerm:string="";
  pageSize:number=10;
  from: number = 1;
  to: number = 10;
  collectionSize:number=0;
  roleId:number=Number(this.api.getTokenFields('RoleId'));
  userId:number=Number(this.api.getTokenFields('UserId'));
  url:string=this.roleId===1 ? `https://localhost:7084/api/transaction?searchTerm=${this.searchTerm}&from=${this.from}&to=${this.to}` : `https://localhost:7084/api/transaction/${this.userId}?searchTerm=${this.searchTerm}`;
  books:any[]=[];
  booksBackUp:any[]=[];
  onSearchChange() {
    if(this.roleId===1){
      this.url=`https://localhost:7084/api/transaction?searchTerm=${this.searchTerm}&from=${this.from}&to=${this.to}`;
      this.getBorrowedBooks();
    }
    else{
      this.url=`https://localhost:7084/api/transaction/${this.userId}?searchTerm=${this.searchTerm}`;
    }
    this.getBorrowedBooks();
   }
  onStatusChange(){
    const selected:number=Number(this.selectedStatus);
    if(selected!=0){
    this.books= this.booksBackUp.filter((i)=> i.Status===selected);
    }
    else{
      this.books=this.booksBackUp;
    }

   }
  onTitleChange(){
    const selected:number=Number(this.selectedBook)    
    if(selected!=0){
    this.books=this.booksBackUp.filter((i)=> i.TransBookId===selected);
   }
   else{
    this.books=this.booksBackUp;
   }
  }
  getBorrowedBooks(){
    this.api.getDataFromApi(this.url).subscribe((response:any)=>{
      this.collectionSize=response.data.count;
      this.books=response.data.Data.map((book:any)=> ({
        ...book,
        bookStatus: book.Status===1? 'Pending' : (book.Status===2 ? 'Approved' : (book.Status===3 ? 'Returned' : (book.Status===4 ? 'Rejected' : '-') ) ),
        bookStatusColor: book.Status===1? '#F4CE14' : (book.Status===2 ? 'green' : (book.Status===3 ? 'teal' : (book.Status===4 ? 'red' : 'black') ) ),
      }))
      this.booksBackUp=this.books;  
    }); 
  }
  pageChange(newPage: number){
    this.to=newPage*10;
    this.from=(this.to-10)+1;
    if(this.roleId===1){
      this.url= `https://localhost:7084/api/transaction?searchTerm=${this.searchTerm}&from=${this.from}&to=${this.to}`;
      this.getBorrowedBooks();
    }
  }
  getBooksDropdown(){
    this.api.getDataFromApi('https://localhost:7084/api/generic/bookTitle').subscribe((response:any)=> {
      const obj= {
        TransBookId:0,
        Title:"All",
      }
      this.booksTitle.unshift(obj);
      this.booksTitle = this.booksTitle.concat(response.data);
    })
  }
  navigateToSpecificRoute(){
    this.router.navigate(["home/book/apply/new"]);
  }
  update(id:number,transactionObj:any,status:number){   
    const data = {
      TransStuId: transactionObj.TransStuId,
      TransBookId: transactionObj.TransBookId,
      BorrowedDate: transactionObj.BorrowedDate,
      DueDate: transactionObj.DueDate,
      ReturnedDate: transactionObj.ReturnedDate,
      Status: status,
      UserId:transactionObj.UserId,
    }
    this.api.updateDataUsingApi(`https://localhost:7084/api/transaction/update/${id}`,data).subscribe((response:any)=> {
      if (response.statuscode === 200) {
        this.api.successAlert(response.message);
        this.getBorrowedBooks();
      }
      else {
        this.api.errorAlert(response.message);
      }
    })
    
  }
}
