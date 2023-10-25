import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
import { faCheck,faXmark,faRotateLeft,faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {
  approvedIcon=faCheck;
  rejectedIcon=faXmark;
  returnedIcon=faRotateLeft;
  checkedIcon=faCircleCheck;
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
