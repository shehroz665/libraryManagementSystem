import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
import { faPenToSquare, faTrash ,faCheck,faXmark,faRotateLeft} from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {
  updateIcon=faPenToSquare;
  trashIcon=faTrash;
  approvedIcon=faCheck;
  rejectedIcon=faXmark;
  returnedIcon=faRotateLeft;
  sizeIcon:SizeProp='1x';
  roleId:number=Number(this.api.getTokenFields('RoleId'));
  userId:number=Number(this.api.getTokenFields('UserId'));
  url:string=this.roleId===1 ? `https://localhost:7084/api/transaction/` : `https://localhost:7084/api/transaction/${this.userId}`;
  books:any[]=[];
  constructor (private router:Router,private api:ApiMethodsService){
    this.getBorrowedBooks();
  }
  getBorrowedBooks(){
    this.api.getDataFromApi(this.url).subscribe((response:any)=>{
      this.books=response.data.map((book:any)=> ({
        ...book,
        bookStatus: book.Status===1? 'Pending' : (book.Status===2 ? 'Approved' : (book.Status===3 ? 'Returned' : (book.Status===4 ? 'Rejected' : '-') ) ),
        bookStatusColor: book.Status===1? '#F4CE14' : (book.Status===2 ? 'green' : (book.Status===3 ? 'teal' : (book.Status===4 ? 'red' : 'black') ) ),
      }))  
    }); 
  }
  navigateToSpecificRoute(){
    this.router.navigate(["home/book/apply/new"]);
  }
}
