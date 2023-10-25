import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiMethodsService } from 'src/app/Services/api-methods.service';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {
  constructor(private router: Router, private api: ApiMethodsService) {
    this.api.getDataFromApi('https://localhost:7084/api/books/dropdown').subscribe((response: any) => {
      this.books = response.data;
      console.log(response.data);
    })
  }
  userId: number = Number(this.api.getTokenFields('UserId'));
  books: any[] = [];
  applyBookForm = new FormGroup({
    book: new FormControl('', [Validators.required]),
    borrowDate: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
    // returnDate:new FormControl('', [Validators.required]),
  });
  getControl(controlName: string) {
    return this.applyBookForm.get(controlName);
  }
  postData() {
    const formData = this.applyBookForm.value;
    const data = {
      TransStuId: 0,
      TransBookId: Number(formData.book),
      BorrowedDate: formData.borrowDate,
      DueDate: formData.dueDate,
      ReturnedDate: '',
      Status: 1,
      UserId: this.userId,
    }
      this.api.postDataUsingApi('https://localhost:7084/api/transaction', data).subscribe((response: any) => {
      console.log(response);
      if (response.statuscode === 201) {
        this.api.successAlert(response.message);
        this.applyBookForm.reset();
        this.router.navigate(['home/book/apply']);
      }
      else {
        this.api.errorAlert(response.message);
      }
    })



  }
}
